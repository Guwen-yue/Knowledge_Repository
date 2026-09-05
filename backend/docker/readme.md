# Docker
容器
海运 万吨巨轮
Docker 是一个引用容器化工具
- react
-mysql
处理代码 依托一堆的，有版本要求的 运行环境 docker 帮我们打包为一整个容器
非常方便部署在任何设备上

Agent = llm + harness (tool +mcp +rag +skill)

Docker = 应用 + 运行环境

## 举例
你到公司接手一个n年前Vue2的项目 ，要求node 16 + npm 8
 你的电脑装的是node22 跑不起来的

容器化 docker 虚拟化技术 将各个依赖隔离化安装


## Docker 基本概念
image 光盘
应用程序 + 环境   隔离的
 git pull image
类比于  container DVD 


## Web 简单应用
http://localhost:1314
:80 默认端口号
运维知识
服务器软件 把所有80 端口产生的请求 代理给3000端口  

## nignx 
高并发，代码准发 需要 nginx 
监听 80 端口 端口的访问 
并通过配置文件帮我们转发1314端口

### 启动nignx image
docker run
 启动一个镜像 成为可以运行的容器
 --name my-nginx-demo
 容器的名字
 -p 80:80
 80 是nignx 的监视端口
 http://localhost:80 用户浏览器输入转给或者说映射给container 80
 -v ./nignx.conf:/etc/nginx/nginx.conf:ro
 nginx..conf
 nginx.conf   配置文件
 80 代理1314端口
 -d nginx
 后台运行
  docker run --name my-nginx-demo -p 80:80 -v ./nignx.conf:/etc/nginx/nginx.conf:ro -d nginx


## 运维考点
- nginx 
  反向代理

  用户上网initent ->  browser(chrome)->  (正向代理)  —>
  local :80 -> docker -p(ort) : container(80)  -> -v 映射
  配置文件 (local:/etc/nginx/nginx.conf)

  nginx: 80(nignx.conf 代理端口服务) <- : 1314(反向代理)
 localhost 我们是不知道后端具体是在那里运行的