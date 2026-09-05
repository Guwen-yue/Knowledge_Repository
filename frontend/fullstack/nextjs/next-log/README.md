# Next.js Blog 
## 技术背景
- npx
  npx是npm 自带工具，可直接运行node包 ，无需全局安装依赖
  尝试使用 测试电脑跑项目
  npx=npm i -g create-next-app + npx create-next-app
  便捷
  - create-next-app

React 全栈开发脚手架
 ssr(服务端渲染) seo(搜索引擎优化)  rsc(Relative Server Component)
 use client hydration(客户端水合)
  
## 项目需求
笔记系统 ，crud 笔记，支持markdown 格式
存在数据库里的时md 页面显示的时html格式 marked
1. 界面分为两列，左侧为笔记列表，右侧时笔记内容
/ page.js  
2. 点击new 增加一个Note ，增加后，左侧笔记列表也会同时更新
  App Router 文件既路由  rustful
  /add  POST
  /note 
    [id]  动态路由
    page.js  note详情
    /edit
      [id]
        page.js  修改
      page 新加一条
3. 编辑功能，可以删除一个笔记，左侧同时更新
4. 可以编辑当前note ，支持markdown
5. 搜索功能，


## 技术分析
### 路由
### 组件
规范驱动编程
规划需要哪些组件
 组件是工作单元，AI 生成的工作单元
 开发之前不要急的写代码
 分析需求，技术方案(next.js) 任务细节 路由 + 组件
 - Sidebar
   SidebarSearchField EditButton(复用)
   SidebarList
   NoteItem
 - Note
   NoteEditor 编辑
   NotePreview 负责笔记的预览界面

### 目录结构

- app
 页面目录
 page.js
 layout.js
 [id]
- components

## 配置alias

   /app/notes/[id]/page.js
   引入 lib/redis.js
   相对路径 ../../../lib/redis.js
   短链接 @/lib/redis.js
   base url


### BEM 命名规范
- 原子类taildwindcss
- BEM  维护
  Block 块
  Element 元素-
  Modifier 修改器__
- layout
  - nav 侧边栏 ，导航栏
    - html
      head
        title
        meta 
      body
        page.js
    - nav 侧边栏，导航栏
    - section 语义化标签
    - children page.js
    - to be continue 注释大法
      规划未来做的，有利于团队协作，记忆，维护，注释写好要做的事情
      


      dayjs
      
      