# 选一个基础镜像
FROM node:18
# 在容器里切到 /app 文件夹  设置工作目录
WORKDIR /app
# 把本地代码复制进容器
COPY index.js .
# 启动应用
CMD ["node", "index.js"]
