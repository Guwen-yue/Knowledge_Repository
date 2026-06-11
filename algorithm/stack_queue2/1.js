const arr = [1, 2]
console.log(arr.splice(1, 0, 3))// [] 不是纯函数
console.log(arr)// [1, 3, 2]
let arr1=arr.splice(1,1)
console.log(arr)// [1, 2]
console.log(arr1)// [3]
