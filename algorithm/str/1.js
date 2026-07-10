function validPalidrome(s) {
    const len = s.length;
    let i = 0, j = len-1;
    // [i+1, j]  [i, j-1]; 允许删除一个
    // 对称
    while (i < j  && s[i] === s[j]) {
        i++;
        j--;
    }
    function isPalindrome(st, ed) {
        while(st < ed) {
            if (s[st] !== s[ed]) {
                return false;
            }
            st++;
            ed--;
        }
        return true;
    }
    if (isPalindrome(i + 1, j)) {
        return true
    }
    if (!isPalindrome(i, j - 1)) {
        return true
    }
    

    return false;
}
console.log(validPalidrome("abca"))
console.log(validPalidrome("abc"))
console.log(validPalidrome("a"))
console.log(validPalidrome("ab"))