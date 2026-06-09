let arr1 =[1,2,3,4,5,6,7]
let arr2=arr1.map(item=>{
  let num = item*2
  return num
})

console.log(arr2)

console.log(arr1.filter(item=>{
  return item>3
}))
console.log(arr1.every(item =>{
  return item % 2  === 0;
}))
console.log(arr1.some(item =>{
  return item % 2  === 0;
}))
console.log(arr1.reduce((pre,cur)=>{
  return pre+cur
}))
