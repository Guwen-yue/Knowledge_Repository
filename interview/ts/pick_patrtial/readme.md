## Docker
- 本地安装了mysql
- docker pull mysql
  版本不一样，
  docker run -d --name mysql--demo -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0 



## TS高级类型
- Pick<T,选取类型的联合字符串>
- Omit<T,要排除的类型的联合字符串>

Omit<T,k> 等价于 Pick<T,Exclude<keyof T,k>>怎么理解？
-  key of T 拿到所有键的联合类型 
- Exclude 把要剔除的K 键删除，剩下需要保留的键
- 再用Pick 把剩下的键从类型T中挑选出来，就实现了Omit的效果
- ts 内部的等价思想 
## 工具类型
Pick,Omi,partial Exclude ,key of Returntypes,Record