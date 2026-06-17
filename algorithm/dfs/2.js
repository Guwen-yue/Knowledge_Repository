//  递归的升级 ，迭代实现
function dfsPreOrderIter(root ){
  if(!root) return [];
//递归出口，当root为空时，返回空数组
  const res=[];//结果数组
  const stack=[root];//栈实现
  while(stack.length){
    const node=stack.pop();
    res.push(node.val);
    if(node.right){
      stack.push(node.right);
    }
    if(node.left){
      stack.push(node.left);
    }
  }
  return res;
  // 结果
}
