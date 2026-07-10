let o={
  name:"胡老板",
  say:function(){
    console.log("我是"+this.name)
  }
}
let obj={
  name:"张老板"
}
o.say()
// js 函数也是对象
o.say.call(obj) //函数会运行，指定函数运行时this的指向第一个参数
// js底层玩了一手
// ‘’出来的str 本来是不可以str.length的
// len(str) 代码里面混入了函数 + 面向对象 两种写法
// js为了统一面向对象写法，
// str 在底层 new String() 包装一下 就是一个String实例 有length属性，用完后，还要带扫战场，自动把str又改回原有的简单数据类型
// 这用到了包装类 把简单数据类型继承了对象的属性，开发简单，好读
      
