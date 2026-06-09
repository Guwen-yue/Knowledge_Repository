// promise es6用于异步任务控制的最佳机制
const p = new Promise((resolve,reject)=>{
  console.log("许诺言")
  // 耗时性任务的 
  setTimeout(()=>{
    resolve("success")
    reject("网络错误");
  },1000)
});//
console.log(p.__proto__);
p
  .then((data)=>{ 
    console.log('end',data)
  }).catch((error)=>{
    console.log('失败了',error)
  })

