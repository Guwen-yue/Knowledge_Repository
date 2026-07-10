"use strict";
// 启用严格模式 
const oForm = document.querySelector('.add-items');
// JS 事件驱动的
// 异步？ 
oForm.addEventListener('submit', addItem);

function addItem(e) {
  console.log(e);
  // 阻止提交默认行为 刷新页面
  e.preventDefault();
}

document
  .querySelector('.lnk')
  .addEventListener('click', goBaidu);

function goBaidu(e) {
  // 函数运行时一定会有的一个对象 
  console.log(this); //指向？ 
  e.preventDefault();
}

let obj = {
  name: "赖庆庆",
  say: function() {
    console.log(this);
    console.log(`${this.name}`)
  }
}
let obj2 = {
  name: "甜总"
}
var name = "佳明";
obj.say(); // 函数作为对象的方法调用 this指向调用对象
const fn = obj.say;// 引用式赋值
// fn();// 普通函数被调用， this指向全局的window 
obj.say.call(obj2);// 手动指定 this 指向 obj2
obj.say.apply(obj2);