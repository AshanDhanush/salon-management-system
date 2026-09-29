import threading
import os
os.environ["OPENBLAS_NUM_THREADS"] = "1"
import certifi
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from rag_agent import create_rag_agent
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings


load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ChatRequest(BaseModel):
    question: str
    session_id: str


def watch_mongodb():
    try:
        client = MongoClient(
        os.getenv("MONGODB_URI"),
        tlsCAFile=certifi.where()
    )
        db = client[os.getenv("MONGO_DB_NAME")]
        collection = db["Appointments"]
        
        embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001", google_api_key=os.getenv("GOOGLE_API_KEY"))
        vectorstore = PineconeVectorStore(index_name=os.getenv("PINECONE_INDEX_NAME"), embedding=embeddings)

        print("Started MongoDB Change Stream...")
        with collection.watch(full_document='updateLookup') as stream:
            for change in stream:
                doc = change.get('fullDocument')
                doc_id = str(change['documentKey']['_id'])
                
                if change['operationType'] in ['insert', 'update', 'replace']:
                    content = f"Appointment: {doc.get('service')},Title: {doc.get('title')}, Date: {doc.get('date')},Price: {doc.get('price')},Category: {doc.get('category')}, Status: {doc.get('status')}"
                    vectorstore.add_texts(texts=[content], ids=[doc_id])
                elif change['operationType'] == 'delete':
                    vectorstore.delete(ids=[doc_id])
    except Exception as e:
        print(f"Error in watch_mongodb: {e}")

# Start sync in a background thread
threading.Thread(target=watch_mongodb, daemon=True).start()

qa_chain = create_rag_agent()

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        
        config = {"configurable": {"session_id": request.session_id}}
        
        response = qa_chain.invoke(
            {"question": request.question}, 
            config=config
        )
        
        return {"response": response, "sources": []}
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port
    )

