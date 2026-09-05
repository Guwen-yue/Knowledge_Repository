// web worker 独立计算  子线程
// 不可以做DOM api  自己的api
console.log("worker online")
// self 关键字
self.onmessage= (e) => {
  console.log(`worker 收到主线程任务 ，参数为${e.data}`)
  const { num } = e.data
  let sum=0
  for(let i=0;i<5000000;i++){
    sum+=i * num
  }
  self.postMessage({
    result:sum
  })
}

