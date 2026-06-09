# js 同步和异步
## js 有哪些异步任务
cpu执行时间 不能霸占，几十毫秒的轮询分配给进程的执行时间。
进程是董事长 PID process  
线程是经理  Thread
主线程，还可以启动子线程

- c++，java等 系统级别语言有多进程多线程架构,执行效率高，但是复杂。
- js 简单，天生设计为单线程架构，  setTimeout该怎么办?

## js执行机制
- 前端scipt 或后端node / bun 代码执行
- 启动一个进程 PID 负责分配资源
- 进程启动一个主线程
    js 足够简单 ，单线程
- js 会把他们放入到event loop中
  可以快速的把同步代码，用户需要看到的页面 
- 还有定时器 ，fetch 请求 ，事件等耗时性任务的异步任务async task
- js会把他们放入到event loop中
  ，跳过，先执行完后，再到event loop中把异步代码拿出来执行。

## 控制执行流程呢？
A fetch user api 所有的用户
B fetch 每一个用户

## 理解promise
- 实例化promise
- 需要传递一个函数，executor
  会立即执行，是耗时性任务的容器
  T同步，里面可以容纳异步任务
  会得到resolve reject两个函数能力
- resolve 表示异步任务失败了，
  catch 被调用
- 再executor里面的异步任务成功解决或异常时，手动调用
- resolve(result) 传给then
- reject(error) 传给catch