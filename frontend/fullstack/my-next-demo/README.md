1. 文件系统的路由映射
  page.tsx 
  layout.tsx  布局，共享的
  loading.tsx 加载UI
  not-found.tsx 404页面
  error.tsx 错误页面

2. 目录映射 目录名直接映射道URL

3. Link 组件
- 他是客户端导航，无需刷新页面
hash history 局部刷新
还是请求后端的，只是不整页刷新(白一下)。
前端导航，next.js会自动发一个RSC payload（React Server Component 序列化） 数据是后端拿的，只是走ajax请求，不是浏览器传统的整页导航。


- 预加载可连接的页面，提升速度
<Link rel ="prefetch" href="/about" />
浏览器空闲时提前加载资源
<Link data-n-head="ssr" rel ="dns-prefetch" href="/about" /> 
dns domain system key:value 分布式数据库
domin -> ip查询 （电信服务商），解析实践