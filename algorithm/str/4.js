// api 解法
function isPalindrome(s) {
  return s.split('').reverse().join('') === s;
}

console.log(isPalindrome("racecar"))
console.log(isPalindrome("hello"))
console.log(isPalindrome("a"))

// 对称特性 双指针解法
function isPalindrome2(s) {
  let len = s.length;
  for(let i=0;i<len/2;i++){
    if(s[i] !== s[len-1-i]){
      return false;
    }
  }
  return true;
}

console.log(isPalindrome2("racecar"))
console.log(isPalindrome2("hello"))
console.log(isPalindrome2("a"))

