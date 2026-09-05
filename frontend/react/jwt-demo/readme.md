# jwt 登录鉴权
用的都是 JWT JSON Web Token
- HTTP 是无状态 Stateless  用户身份？ 你是谁？ 
- Header Authorization 
  Bear  Token  一串鉴权码  凭证 加密
- /login admin 123456
  { id: 1, username: 'admin', role: 'admin' }
   JSON身份对象 => JWT => Token 颁发给登陆者
   每次带上token => authorization => decode => JSON 对象


## zustand
轻量级的状态管理框架 react 全家桶 react + react-router-dom + zustand
- 父子传递 组件通信 状态共享
- createContext
- useContext + useCreateContext  跨级共享
- 登录与否 用户信息 全局状态 全局共享
  zustand 统一管理

## Toke 加密算法
颁发的令牌 加盐 自己命名的东西
 expireIn 过期时间


## JSON WebToken
sign  verify  两个动作
sign 用户json对象（身份信息，json强大的表现力）
cookie/session 登陆方案 
cookie 请求每次都会带上sessionID 
sessionID -> 内存中 session 会话对象 不太适合分布式环境 
JWT就没有这个问题 ，任何一台服务器签发的token都可以在任何一台其他自己的服务器上 解码出来 JSON对象


## 拦截器
axios 默默的做了很多
1. 后端签发的token放在localStorage
2. axios 配置里添加一个interceptors
  - request
  config请求配置对象
  config.headers['authorization'] = `Bearer ${token}`
  每次请求自动带上 
  每个axios 请求拦下来
  - response
  服务器返回的数据是response.data
  reponse还有 response.config response.headers
  
3. 

