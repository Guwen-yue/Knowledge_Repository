# Users Chat AI 全栈项目

- 后端 + 前端 目录创建
    目录 ->全栈项目 -协作形式 （前后端分离 古法编程时代）
    -> 模块化

## 模块化 module
- 一个函数只做一个功能
- 一个文件只写一个功能
- 一个文件只负责一个模块

### 优势
- 方便维护
- 高质量
    可读性，简单可靠

### js
前端 ，后端 ， ai ，嵌入式....

## users 项目需求
- 后端  
    users 相关的数据接口 API Appliation Interface
    http server 
    - url unicersal resource location 统一资源定位符   
    http:localhost:3000/users  用户列表资源 
    http:localhost:3000/users/:id  动态路由 某个用户的详情 

    ### restful 设计模式 暴露资源
    web 开发的根基  阿里巴巴java代码规范
    - 设计url 的范式
    协议：//域名:端口   某台服务器的某个服务  资源 
    http://localhost:3000/users/:id 
    
    - http的动作 
        CRUD 
        GET   Read http://localhost:3000/users/:id
        POST  Create http://localhost:3000/users
        PUT/PATCH   Update http://localhost:3000/users/:id
        DELETE Delete http://localhost:3000/users/:id
- js node 后端初始化
        npm init -y package.json 是项目描述文件
        npm node package management  node包管理器
        npm i json-server 

## 数据存储
- 数组，对象 内存中的数据容器
- 长期储存
    数据库 myspl 
    json 文件  javascript object notation { "key":"value"}
    excel csv 文本文件 pdf.......

## 前端
- 前端三剑客 html css js
### html
- 盒子
    块级的能力 宽高
    PC 业务 布局    左右留白
    container 设备 电脑屏幕的尺寸
- 语义化标签 
    div.container(盒子) > nav + main + aside
    不要div 满天飞 nav/main 拒绝用div
    - 可读性更好，有利于维护
    - 搜索引擎优化更好 SEO  爬虫看的
        百度/google 爬虫 爬取网页 分析DOM结构
- DOM 模型
    Document Object Model 文档对象模型
    - Document
    html document 文本
    text/plain
    html 标签 a http 传输的超文本传输协议一种 
    文本格式
        text/html
        <!DOCTYPE html>
        !   html5 版本的标记

- DOM树 
    html 是根节点
        body 是可视区的开始节点
            header
            .container
                nav
                main
                nav
            footer
- Object Model?
    HTML  通过浏览器的树状结构，在内存中建立全局的Document对象对象，通过Document对象可以操作html ，动态改变页面
    DOM 编程
    document.querySelector 树的查找
    id 很快 唯一索引
    .table 次之
- 内容
    行内 

## prompt
- 加上模块化的约束
- 请你帮我设计 users 用户数据接口，请遵循restful 机制 
- 请帮我编写首页，使用 bootstrap css框架， 使用语义化标签

lanchain 