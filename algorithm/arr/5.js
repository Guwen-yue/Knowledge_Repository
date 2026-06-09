// let arr= new Array(3).fill([1,2,3])
// console.log(arr)

const arr = new Array(3)
let len=arr.length
for(let i=0;i<len;i++){
  arr[i] = [];
}
console.log(arr)

// 对象属性访问 性能差的 ，优化就是把长度用常量存起来
for(let i=0;i<len;i++){
  for(let j=0;j<len;j++){
    console.log(arr[i][j],i,j)
  }
}
console.log(arr)