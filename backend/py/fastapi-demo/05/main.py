from fastapi import FastAPI
from pydantic import BaseModel,Field
from typing import Annotated,List,Optional
# from typing_Extensions import Annotated
app =FastAPI(title="Todo增删改查")

todos =[]
nest_id=1

class Todo(BaseModel):
  title: Annotated[str,Field(min_length=1,max_length=100,description="待办事项标题，1-100个字符之间")]
  done:Annotated[Optional[bool],Field(default=False,description="是否完成")]
 
#  代码就是注释 
@app.get("/todos",summary="查询所有待办",response_model=List[Todo])
async def get_all_todos():
  return todos

@app.get("/todos/{todo_id}",summary="查询指定待办事项")
def get_todo(todo_id: Annotated[int,Field(...,gt=0,description="Todo ID, 必须大于0")]):
       for item in todos:
        if item["id"] == todo_id:
          return item
        return {"msg": "找不到这条todo"}

if __name__ == "__main__":
  import uvicorn
  uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)