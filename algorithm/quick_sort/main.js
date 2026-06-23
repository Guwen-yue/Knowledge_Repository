// 治
function partition(arr, left, right) {
  const pivot = arr[left];
  let i = left, j = right; // 左右指针
  // 检查一遍数组
  while (i < j) {
    // 把第一项作为基准值
    // 不开销新的空间 原地排序
    while (i < j && arr[j] >= pivot) {
      // 右侧比基准值大的 放到右边的数组
      j--; // 推出的时候是找到了第一个比基准值小的元素
    }
    // 右边
    if (i < j) {
      //
      arr[i] = arr[j];
      i++;
    }
    while (i < j && arr[i] <= pivot) {
      i++;
    }
    if (i < j) {
      arr[j] = arr[i];
      j--;
    }
  }
  // 元素交换
  arr[i] = pivot;
  return i;
}  
// 分
function quickSort(arr, left, right) {
  if (left >= right) return;
  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}
