- path.join & path.resolve
 都可以拼接路径，
 区别：
 - resolve 将多个路径拼接成一个绝对路径，返回一个**解析后**的绝对路径。
 如果传入了相对路径，会以当前工作目录为基准，计算绝对路径
 - join 则会直接拼接路径
 工程话思维 根目录 / ，开发代码目录src ，静态资源目录/src/assets,
 工具函数目录  /src/libs

 - path.dirname 返回路径中的目录名 
- path.basename 返回路径中的文件名, 并可选的去除给定的文件扩展名。
- path.extname 返回文件扩展名
- path.normalize 规范化路径