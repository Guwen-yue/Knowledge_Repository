# Ajax

## JSON.stringify(value,replace?,space?)
- 将对象序列化为json格式字符串 便于网络传输
- replace 取舍 ？  null原样序列化
- space给几个空格 团队规范
可读性

## JS异步处理
- js是单线程 遇到异步任务 就会放到eventloop里面去 ，在跳过往下执行
- 等到执行时机到了，eventloop会将异步任务放到js线程里面去执行.(回调函数 callback)
- 也可以使用promise(封装异步任务+then()) 来处理异步任务
- 最建议使用async/await 来处理异步任务
    比上面两种都优秀，跟同步看起来一样