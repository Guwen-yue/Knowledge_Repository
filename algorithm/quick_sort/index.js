/**
 * 快速排序
 * 思路：选一个基准值，比它小的放左边，比它大的放右边，递归处理左右两部分
 * 时间复杂度：平均 O(nlogn)，最坏 O(n²)
 * 空间复杂度：O(logn)（递归栈）
 */

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0]; // 取第一个元素作为基准
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 测试
const arr = [5, 3, 8, 1, 9, 2, 7, 4, 6];
console.log('排序前:', arr);
console.log('排序后:', quickSort(arr));
// 排序后: [1, 2, 3, 4, 5, 6, 7, 8, 9]
