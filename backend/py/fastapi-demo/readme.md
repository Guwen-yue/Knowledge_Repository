



FastAPI = Pydantic(zod 类型检测)  + Starlette（负责web底层 接受http服务 返回响应 处理网络 自带异步能力 是高性能的web 基座）

路由参数
/user/123 pydantic 约束一定是整数

Starlettle 异步
async
  - 数据库查询
  - 文件读写

## 环境安装
pip install "fastapi[standard]"
uvicorn  是异步服务器用来运行fastapi应用
pip install "uvicorn[standard]"


Annotated  丰富类型注解，
Annotated[int,Path(ge=2)] 
自动做类型转换