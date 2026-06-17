function dfs(root ,res =[]){
  if(!root) return res;//递归出口，当root为空时，返回空数组
  res.push(root.val);
  dfs(root.left,res);
  dfs(root.right,res);
  return res; // 结果
}

