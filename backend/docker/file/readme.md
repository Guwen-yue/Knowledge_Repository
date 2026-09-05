# Dockerfile 
蜜雪冰城 **标准操作手册SOP** ,写清“先加奶茶，再加奶，放三勺糖，摇匀”
任何人照着做，出来的味道都一样，就成了连锁店

DOCKEERFILE 是一个文本配方文件，里面写着一步步“做菜”的步骤，
DOCKER 照着做他就能自动做出一个一摸一样的DOCKER 镜像，运行

docker build -t my-docker-demo .  # 构建镜像
docker login   # 登录dockerhub
docker push my-docker-demo  # 推送镜像到dockerhub
docker pull my-docker-demo  # 从dockerhub拉取镜像
docker run -it my-docker-demo  # 运行容器

Dockerfile 是发布项目的标准方式之一。

## todos 全栈项目
- 前端 react + ts + zustand 
- 后端 nest.js + Todo Module 
- nginx 
  80 -> 3000 
  也可用来跨域