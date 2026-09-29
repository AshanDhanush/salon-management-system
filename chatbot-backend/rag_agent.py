import os
from dotenv import load_dotenv
import langchain_core
from langchain_pinecone import PineconeVectorStore
from langchain_groq import ChatGroq
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_mongodb import MongoDBChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import MessagesPlaceholder


load_dotenv()

def create_message_history(session_id: str):
    return MongoDBChatMessageHistory(
        connection_string=os.getenv("MONGODB_URI"),
        session_id=session_id,
        database_name=os.getenv("MONGO_DB_NAME", "salon_db"),
        collection_name="chat_histories",
    )

def create_rag_agent():

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        output_dimensionality=768,
    )

    vector_store = PineconeVectorStore(
        index_name=os.getenv("PINECONE_INDEX_NAME"),
        embedding=embeddings,
        pinecone_api_key=os.getenv("PINECONE_API_KEY")
    )

    llm = ChatGroq(
        temperature=0,
        model_name="llama-3.3-70b-versatile",
        groq_api_key=os.getenv("GROQ_API_KEY")
    )

   



    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant for a premium salon. Use the context to answer concisely."),
        ("system", "Context: {context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ])

    retriever = vector_store.as_retriever(search_kwargs={"k": 3})

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_chain = (
        RunnablePassthrough.assign(
            context=lambda x: format_docs(retriever.invoke(x["question"]))
        )
        | prompt
        | llm
        | StrOutputParser()
    )

    # 6. Wrap with History
    return RunnableWithMessageHistory(
        rag_chain,
        create_message_history,
        input_messages_key="question",
        history_messages_key="chat_history",
    )