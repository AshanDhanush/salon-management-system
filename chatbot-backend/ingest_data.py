import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore

load_dotenv()

def ingest_docs():

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        output_dimensionality=768
    )

    
    vector_store = PineconeVectorStore(
        index_name=os.getenv("PINECONE_INDEX_NAME"),
        embedding=embeddings,
        pinecone_api_key=os.getenv("PINECONE_API_KEY")
    )

    
    if not os.path.exists("./policies.txt"):
        print("Error: policies.txt not found!")
        return

    loader = TextLoader("./policies.txt")
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
    splits = text_splitter.split_documents(documents)

    
    print(f"Uploading {len(splits)} chunks to Pinecone...")
    vector_store.add_documents(splits)
    print("Ingestion complete!")

if __name__ == "__main__":
    ingest_docs()