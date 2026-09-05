# 浏览历史

## 路由 Route
- navigator 对象
- 浏览器 url
  - url 浏览器 访问代理
  - http 协议 server 发起请求
  - server 的伺服状态 给与响应 text/html
  - 浏览器拿到响应数据 渲染页面
  - 浏览历史插入一条记录

## 链接
 万物互联
 <a href="">
 多了点啥?
 传统的，每次都得重新渲染整个页面。pc 时代
 慢，没有必要重新渲染整个页面 
 移动时代， single page Application
 SPA 

 传统的多页面 每次都需要重新渲染 移动端时代
 有点没必要了 页面会白一下(网速慢一点)
 访问体验上提升
 怎么把丰富的内容在一个网页显示
 DOM编程？
 根据相应的url
 /index.html content DoM放在挂载
 #container
 /about aout.html 
 #container

## 但也应用
- 点击链接跳转
  - url 和资源 一一对应的关系
  hash 方式可以做到
  改变hash url 改变了，不会跳转

## Hash 路由
http(s)://www.baidu.com/u/123?a=1&b=2
protocol     host        path   queryString
url 中 ，hash 部分 # 开始
- url 一定要变， 不同的url对应不同的资源
- 监听变化 根据hash 部分 渲染不同的内容
有点是url该变了（局部），页面不会全刷新。

hash 作为url 一部分，标记一个传统的pc长页面 可以坐电梯一样直达。
做前端路由  #/  #/about  不会重新渲染  ，又能满足url和资源的一一对应关系，前端路由。
当hash 部分改变的时候  hashchange 事件 ，dom 或组件替换。

