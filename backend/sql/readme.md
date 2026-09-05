# SQL

## 后端业务有几张表？
文章，点赞，收藏，品论，评论，用户，头像
- 怎么建表
- 怎么建索引
- 怎么建约束

## 用户表
- 用户规模
- 用户得登录，用户表最好只存储id,username,password核心字段
user表比较小，有利于分布式 ， 有利于查询，有时候还要分表
id自增 primary key
username UNIQUE key 不能重复
password 不能存明文
头像，slogan 可以另建表关联查询

索引？ Index，多少类索引，为啥建？
查询需求 高频查询 安排查询
- 小家 /user/:id Primary Key 
- 搜索用户 unique key

···
CREATE TABLE `user`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name`varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;

##  头像表
头像图片服务器放在静态服务器上
/public/avatar/:id
或云服务器 oss 独立的静态资源服务器 存放 ，放回就是一个阿里云的地址
```
CREATE TABLE `avatar`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `mimetype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `filename` archar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `size` int(11) NOT NULL,
    `userId` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    <!-- 普通索引 根据用户id 查询头像 -->
    KEY `user_id` (`userId`),
    CONSTRAINT `user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```
nest.js 数据库 后端业务 部署在中央机房 强关联的 juejin.cn
又nginx 反向代理的一批服务器集群

juejin.cn 域名
**dns 解析** 分布式数据库 逐级查找
先看本地有没有缓存 （浏览器，本地也有）
网络服务商 一些dns 服务器 账本 双11
国家服务器 
根服务器 .com .org 米国
ip 地址 三次握手，建立链接
根据我们的所在，将最近的服务器ip地址给我们（nginx服务器地址，并不是真正服务的服务器地址）
好几个服务区，每个服务区配置nginx 负载均衡服务器 的ip地址
服务器集群，独立IP，都有web程序，都能提供服务 由一台负载均衡服务器nginx 来方向代理

**静态服务器**，img,css,js 静态资源，简单 有自己的特征

cdn 服务器 content dilivery network 专门用于发布静态资源
网络公司，很多的网络节点购买一些cdn服务器，用户就近访问资源

## 文章表
```
CREATE TABLE `post`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `content` longtext COLLATE utf8mb4_unicode_ci,
    `userId` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`userId`),
    CONSTRAINT `user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```

## 点赞表
```
CREATE TABLE `user_like_post`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) NOT NULL,
    `postId` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`userId`),
    KEY `post_id` (`postId`),
    CONSTRAINT `user_like_id_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
    CONSTRAINT `user_like_id_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`),
    UNIQUE KEY `user_like_id` (`userId`,`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```
索引的人士，举例子
不用单独建立 userid key，因为 联合主键userId,postId  严谨覆盖率
## 收藏表
## 评论表
```
CREATE TABLE `user_comment_post`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `content` longtext COLLATE utf8mb4_unicode_ci,
    `userId` int(11) NOT NULL,
    `postId` int(11) NOT NULL,
    `parentId` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`userId`),
    KEY `post_id` (`postId`),
    
    CONSTRAINT `user_comment_id_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `comment` (`id`) ON DELETE SET NULL ON CASCADE,
    CONSTRAINT `user_comment_id_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON CASCADE,
    CONSTRAINT `user_comment_id_ibfk_3` FOREIGN KEY (`parentId`) REFERENCES `user_comment_post` (`id`) ON DELETE SET NULL ON CASCADE,
    UNIQUE KEY `user_comment_id` (`userId`,`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```

### tag表
```
CREATE TABLE `tag`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```
```

CREATE TABLE `user_tag_post`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `postId` int(11) NOT NULL,
    `tagId` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `post_id` (`postId`),
    KEY `tag_id` (`tagId`),
    CONSTRAINT `user_tag_id_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON CASCADE,
    CONSTRAINT `user_tag_id_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON CASCADE,
    CONSTRAINT `user_tag_id_ibfk_3` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE SET NULL ON CASCADE,
    UNIQUE KEY `user_tag_id` (`userId`,`postId`,`tagId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```
## 文件表
```
CREATE TABLE `file`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `originalname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `mimetype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `size` int(11) NOT NULL,
    `postId` int(11) NOT NULL,
    `userId` int(11) NOT NULL,
    `width` smallint(6) DEFAULT NULL,
    `height` smallint(6) DEFAULT NULL,
    `metadata` json DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`userId`),
    KEY `post_id` (`postId`),
    CONSTRAINT `post_id` FOREIGN KEY (`postId`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4_unicode_ci;
```

## 项目准备
目录下有个database 文件夹
  blog.sql 数据表设计文档
  准备些数据