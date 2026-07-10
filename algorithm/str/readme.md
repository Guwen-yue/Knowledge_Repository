# 面试中常考的字符串算法

## 反转字符串
- 字符串没有reverse方法 
- 数组上有reverse方法 
先split 把字符串换成了数组
再reverse 数组反转
再join 把数组换成了字符串

let str ='abc' 这是简单数据类型
js完全面向对象  

下面是把对象序列化（字符串化）
let o={a:1,b:2}
o.toString() [object Object] ？
JSON.stringify(o)  这个才是对象序列化
正好，js一切皆是对象，Object都是对象的原型，怎么去区分不同的对象子类型 o.toString（） 把这个区分细化类型的活干了
"[object Object]"
[1,2,3].toString() 1,2,3  数组序列化

- call  js 函数可以借给别人去用的

## 判断以一个字符串是否时回文字符串
正着读和反着读都是一样的

## 回文字符串的衍生问题

给定一个非空字符串s ，最多删除一个字符。判断是否能成为回文字符串。
