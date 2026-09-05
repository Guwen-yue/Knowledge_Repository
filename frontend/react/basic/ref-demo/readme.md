# react 常用hooks

## useState
响应式的状态

## useEffect
响应式的副作用

## useRef
可变对象
- 可变，但不希望触发渲染 ？
- 绑定 DOM 对象
react 不直接操作DOM
万一要操作DOM ?  

## DOM 编程
- js在v8引擎
- dom 在渲染引擎
js 里做dom 编程非常耗性能 
- react vue 之前 原生js 做dom编程 
- react vue 新框架
  直接规避DOM编程，不要做DOM编程
  react框架 帮我们
  useState 数据绑定 +响应式编程
  前端开发方式直接改变

## 如果非要去DOM?
  不时不可以做DOM编程，而是交给react useRef来了
  - useRef 声明一个可变对象 null
  - jsx dom ref属性绑定
  current 指向这个dom 节点对象
  - useEffect 
  都可以改变 useState  聚焦数据状态业务
  useRef  DOM对象引用等...
  - useState 响应式的

## 总结定义
Useref 时react的一个提供持久可变对象hook函数，经常用来DOM节点对象。
他有一个current 属性，可以指向任何值或对象，不会触发渲染。

## useRef worker对象
## js？ 单线程
做一些前端交互，脚本工作，简单，显示和操作的页面，一致性，不能出问题,
js如果时对线程可能就会有冲突 

页面复杂起来，有很多任务要干，耗时任务，event loop js 异步执行机制
异步无阻塞，不要卡在这里，前端要尽快去响应用户的交互（滚动屏幕，点击..）

llm 游戏 非界面的业务逻辑 ，很耗时计算时间 ，event loop 异步搞不定，用worker 线程，
接下更耗时，复杂的任务，浏览器独立开辟的内存，复杂计算，完成后告知主线程（消息机制）

## Web Worker 线程
浏览器提供给js 可以调用的耗时性计算，或者llm, 游戏等复杂任务的worker 线程

js单线程，event loop 机制 运行的代码，
不适合某些复杂计算业务，html5提供的新特性.Web Worker 线程。
- 开启一个新的线程
new Worker(
  new URL("./worker.js",import.meta.url)
)

## web worker 适合的场景
- event loop 同步代码 ? + 异步代码? 
- 耗时性复杂专项任务
  - 游戏引擎计算  
  - llm
  - 加密等密集计算
- 先实例化
- 消息机制
- js难道成了都线程语言？只是在执行一些巨复杂的任务时，主线程，主线程和由浏览器提供的web worker 线程
  js是v8引擎的运行时 浏览器 c++ 多进程多线程的软件软件 
- js 主线程和worker线程隔离开
  两个线程互不打扰，并行执行 

## 总结
useRef 用来存放持存放 web-worker实例，组件每次渲染不会重置该线程对象，并且在useEffect组件挂载后， 优先渲染。
方便监听，发送数据，以及组件卸载销毁线程。

js 为主线程单线程,event loop 机制 ,  主线程负责脚本执行, DOM渲染，用户交互等忙的飞起，繁重的cpu计算会阻塞主线程，造成页面卡顿，于是浏览器提供web-worker 开辟独立后台线程承担纯计算任务。
worker无法访问DOM ，只能通过消息机制和主线程相互通信。
他只是浏览器提供的辅助线程，页面渲染，组件更新，交互事件
依旧只能在唯一js主线程进行，因此，js任是单线程语言