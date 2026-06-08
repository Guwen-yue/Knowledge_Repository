function add(a:number,b:number):number{
  return a+b; // +可能会字符串的拼接
}

// js足够简单
let a=1;
let b="2";
let num:number =add(a,+b) //强制类型转换Number ，隐式类型转换
console.log(num);