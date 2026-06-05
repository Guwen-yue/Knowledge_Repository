// v8引擎的眼里是
var myname; //变量提升
// 声明提升
function showName() {
  console.log("函数showName 执行了")
}

showName();
console.log(myname)
myname = "方磊"
