# Next.js + AI

基于 React 的全栈开发框架，最好的ai 全栈框架，为全栈开发叠加了上下文buff 。

## 什么是框架？ Framework？
想象为一个建筑蓝图/工具箱，不需要从零开始造房子
而是提供了地基，墙壁和屋顶的一个基本架构。
以前是为开发者所有，现在是ai也可以用。
我们只需要关注组装和装修这个房子，关注业务

## js 和React
返回jsx格式 ，响应式状态

把开发者从低端的前端API 命令式流水线编程，通过现代前短裤React/Vue MVVM ，直接写业务就好
``` jsx
const { count, setCount } = useState(0);
<>
  {count}
  <button onClick={() => setCount(count + 1)}>增加</button>
</>

```

## Next.js  基于React 的框架
AI 上下文 = 组件 +  响应式业务 + 路由 + 服务端渲染 + API
不使用框架： 散乱的积木和工具

- 图片放哪里 ?  /public
- 页面  /pages
- 组件  /components
- API  /api
- 服务端渲染  /app
使用框架 预制的乐高积木 提供了一系列的约束最佳实践 ，和ai SDD文档上下文不谋而合

开发效率大大提升，常见功能内置好，文件放在那里，请求方法放哪？
框架提供基础结构，开发者专注于**业务**逻辑。AI FDE harness 落地
使用框架 ，也给ai一套约束，一套上下文。ai 能够更高效的根据框架给的约束开发项目

## 为什么选next.js
- 传统的前后端   react + Java/python 两种语言，**上下文切换成本**，
- cc/ codex 支持最好   约束 简化(csr ssr)
- 生态超级丰富
  - shadcn/ui 组件库  ElementUI
  - tailwindcss 原子类名自带语义，特别适合ai学习 ai语义理解能力
  - vercel 公司 全球唯一一家js栈  AI coding Agent 以及ai生态的技术公司 快捷发布 域名二级 ，绑定域名。
  - 

  