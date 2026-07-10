# 存储
- mysql 关系型数据库、
- 浏览器缓存 打开之前打开过的页面 很快
- 本地存储 文件 json csv excel ...
- 云盘
- redis 缓存 
  KV 第一次走mysql 读取文章列表，每次没有必要实时的去mysql里查，mysql性能又瓶颈（相对与代码），把结果放到 redis，
- llm 大型的embedding 存储  数据只能 

## 前端八股
- form 表单时用于收集用户的输入，点击submit按钮 ，向action地址提交，一般不用这种默认提交，体验不好，他会刷新页面
  fetch/ajax ,又js提交

## this
函数运行时指定（不是申明时候）
this指向调用者
- 普通函数调用 this指向全局window  也没有必要
var申明的变量，挂载在window上 污染了window对象
let 就不会污染window对象

- 作为对象的方法调用
  this指向调用对象
  对象的方法，引用式复制给变量

- 作为构造函数调用
  this指向实例对象

- 作为时间处理函数
  this指向事件触发元素

- 手动指定 this 指向
  call apply 都可以手动指定this
  区别是 call是数组参数，apply是传数组对象
  bind手动指定this，返回一个新函数

- 箭头函数 没有this指向
  