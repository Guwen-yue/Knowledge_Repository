import { useState } from 'react';
// 重的
function heavyComputation() {
  console.log('heavyComputation');
  // 网页性能优化指标 performance 性能表现api
  const startTime =performance.now();//当前事件
  const result =[];
  for(let i=0;i<1000;i++){
    result.push({id:i,name:'用户-'+i})
  }
  const endTime =performance.now();//当前事件
  console.log('heavyComputation耗时',endTime-startTime);
  // 网页性能优化指标 performance 性能表现api
  return result;
}

function App() {
  // const [users]=useState([
  //   {id:1,name:'张三'},
  //   {id:2,name:'李四'},
  //   {id:3,name:'王五'},
  //   {id:4,name:'赵六'},
  //   ])
    // const [users]=useState(heavyComputation())
    // 下面这个好 good 懒执行,lazy
    // 当数据状态改变时，函数组件再次执行，他会忽略 
    const [users]=useState(()=>heavyComputation())
    const [filterText,setFilterText]=useState('')
    // 数据状态 state,props,computed 计算属性
    const filterdUsers=users.filter(user => user.name.includes(filterText))
  return (
    <div style={{color:'red'}}>
      <h2>用户列表</h2>
      <input type="text" placeholder="请输入用户名过滤" value={filterText} 
       onChange={(e) => setFilterText(e.target.value)}/>
       <p>当前显示{filterdUsers.length}个用户</p>
       <ul style={{maxHeight:'300px',overflowY:'auto'}}>
         {filterdUsers.map(user => (
           <li key={user.id}>{user.name}</li>
         ))}
       </ul>
    </div>
  )

} 

export default App;

// 