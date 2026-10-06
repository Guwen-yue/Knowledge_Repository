from dotenv import load_dotenv
import os 
from fastapi import FastAPI
# 基类 类型检测的功能
from pydantic import BaseModel
# 
from langchain_openai import ChatOpenAI
load_dotenv()

app = FastAPI(title= "langchain & FastAPI")

llm = ChatOpenAI(
  api_key=os.getenv("DEEPSEEK_API_KEY"),
  base_url=os.getenv("DEEPSEEK_API_BASE"),
  model=os.getenv("DEEPSEEK_MODEL"),
  temperature=0.7,
)

class ChatRequest(BaseModel):
  prompt: str

# 校验请求体的类型
@app.post("/chat")
async def chat(request: ChatRequest):
  response = llm.invoke(request.prompt)
  return {"input": request.prompt, "output": response.content}



if __name__ == "__main__":
  import uvicorn
  uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
