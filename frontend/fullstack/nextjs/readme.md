# 大前端手里的nextjs
Next 是react全栈框架，Nust 是vue 全栈框架，Nest是后端框架
NestJS 适合做全栈项目，可以写页面（前端），也可以写api（后端）
背靠Vercel ， seo做的非常棒，很多AI产品用next.js 做官网
##  SEO 搜索引擎优化
SPA有点
体验很好，组件在前端挂载（useEffect），不需要刷新页面。前端路由的支持，让页面切换效果好，快
SPA短板
像Native 端到端APP Android IOS App Store 小红点
SPA 抄的原生App 体验做的和App一样
App 里面80%页面是用的spa做的
原生要写两套， WebView组件 ， 用于显示网页，前端来做
根本就不是为了SEO，不是用浏览器搜索引擎（baidu，google
pc时代是流量入口）
推荐打开，移动端时代（超级App，20%原生，80%都是SPA）

seo 非常差，没有SEO #root  节点
AI超级厉害 OPC多如牛毛 AIAgent 产品站点
SEO 去推广
掘金产品 csdn 老牌的内容类网站
流量来自SEO
主流的SPA开发外，全栈SEO 良好的next.js（nust.js）

# root（SPA） -> seo(react jsx -> html)
(next.js)

## 创建全栈项目
npx create-next-app
选择默认配置
nuxt react全栈框架
react/react-dom react界面
ts
tailwindcss
eslint 代码风格规范

GEO Generative Engine Optimization
用户入口：豆包
生成的时候，带上我们的内容，购买链接
- SEO友好 是怎么实现的
    -SPA #/todos
     -Routes
       Route path: ”/todos“element: <Todos />
       懒加载Todos组件，在前端(client)挂载（#root） 不需要刷新页面
       index.html #rot script : 标签
       CSR Client Side Rendering 客户端渲染
       Server 前端项目所在服务器/index.html
       爬虫通过url来爬取的时候 #root script
       Client 用户的浏览器 用户看得到页面 ， main.js App.jsx Todos.jsx
       在Client 端的运行  CSR Client Side Rendering 客户端渲染
java  全栈？
    server，3000
    /todos 后端路由
    controller 处理请求，server mysql 查询
    todos 数据？ seo 需要
    reaxt 只需要把 react-dom  不管
    reaxt js node的方法
    react组件，只要不做事件监听，不做useEffect 副作用，
    组件函数 + todos 数据 模板编译在一起就好？
    服务器端不是DOM ，字符串的格式化
    前后端分离/todos api  todos json 数组
    全栈项目  /todos 返回的就是react组件编译过后的html
       jsx + todos（数据） = 服务端UI html
       SSR Server Side Rendering 服务端渲染
## CSR和SSR
SEO 的根本
组件到底在那里渲染
CSR在Client 浏览器
SSR在Server 服务器端
## next.js 语法
-App Router
约定大于一切
-App Router
不需要建，文件就是路由，嵌套路由  建立子文件夹
    page。jsx 就是页面
    nav 公用的，layout.js 布局文件
    next.js 是给react的利器
    渲染规则:
    /about 后端路由
    /about/page.tsx 组件的编译 tsx ->html
    -先到layout.tsx 布局
    -再到page.tsx 组件

## SEO 的基本做法
第一层 你是谁？title  做什么的？ description  你有什么价值提供  keywords 
<meta name="description" content="这是一个描述">
<meta name="keywords" content="这是一个关键词">
<title>这是一个标题</title>
第二层
做内容 用户来的原因
第三层
ssr 服务器端渲染
/post/:id  一个页面  千万篇  ssr 整站被seo 收录的额呢绒给你的加权

## 客户端组件
next.js 将react server components 带到
服务器端渲染，ssr开发模式
有些页面 强交互
'use client' 申明
不是只在浏览器渲染， 先在服务器端把能渲染的渲染完， 再去客户端渲染。
包好了水饺， 冻上， 给你送过来
水煮 水合
