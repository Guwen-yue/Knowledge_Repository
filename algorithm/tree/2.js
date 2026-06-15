const tree={
    val:'A',
    left:{
        val:'B',
        left:{
            val:'D',
            left:null,
            right:null
        },
        right:{
            val:'E',
            left:null,
            right:null
        }
    },
    right:{
        val:'C',
        left:{
            val:'F',
            left:null,
            right:null
        },
        right:{
            val:'G',
            left:null,
            right:null
        }
    }
}

function inorder(root) {
    //退出条件
    if (!root) {
        return 
    }
    inorder(root.left);
    console.log(`当前遍历节点的值是:`,root.val);
    inorder(root.right);
}

function preorder(root) {
    //退出条件
    if (!root) {
        return 
    }
    console.log(`当前遍历节点的值是:`,root.val);
    preorder(root.left);
    preorder(root.right);
}

function postorder(root) {
    //退出条件
    if (!root) {
        return 
    }
    postorder(root.left);
    postorder(root.right);
    console.log(`当前遍历节点的值是:`,root.val);
}

function levelorder(root) {
    const queue=[];//队列实现
    const result=[];//结果数组
    if(!root){
        return result;
    }
    queue.push(root);

    while(queue.length){
        const node=queue.shift();
        result.push(node.val);
        if(node.left){
            queue.push(node.left);
        }
        if(node.right){
            queue.push(node.right);
        }
    }
    return result;
}
preorder(tree)
console.log('-----------------')
inorder(tree)
console.log('-----------------')
postorder(tree)
console.log('-----------------')
console.log(levelorder(tree))
