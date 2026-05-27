# Git
- 开发的目录
    - 多人协作，如何分布式存储就是
      github
      gitee码云
      gitlab
      都是中央仓库
- 操作的冲突 
    文件的版本
    一个文件，可以有多个版本
    文件系统 -> 版本控制系统
    回溯项目工程，跟安全，好评估
    
## learn_git
目前是空的项目文件夹 ，是放代码文件（硬盘坏了，改了忘了，多人协作）   
    本地文件 分布式，版本管理 
让git接管他，成为代码仓库
  - github 中央仓库
  - git init初始化 本地仓库(文件 ——> 版本(快照))

- git init
    项目 ——> 仓库 转变
    .git 仓库隐藏目录  安全，不能随便操作 按git的约束来执行
    git bash 微型的linux bash 环境
    shell 脚本
    ls

    文件 1：n 文件版本（快照）

- git status 
  常用，做任何git操作前，
  明确仓库当前状态

- git add readme.md
  readme.md untracked 
  将一个**未被项目跟踪**文件，添加到**暂存区（stage）**
  to be committed 等待提交
- git commit -m "wrote a readme file"
  储存到了.git仓库中，有了第一个版本（快照）
  2  insertions 新增了2行代码

- git 配置
    git config --global user.name "your name"
    git config --global user.email "your email@example.com"
    gitee证件

## repo 仓库
  - remote origin 远程源头 master/main