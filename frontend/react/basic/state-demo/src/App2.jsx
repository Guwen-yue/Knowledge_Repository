import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const handleChange = async () => {
    // await setCount(count + 1); // 修改状态    
    // await setCount(count + 1); // 修改状态 
    // await setCount(count + 1); // 修改状态 
    // console.log(count); /// 同步代码 0
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    console.log(count); // 闭包内旧值，永远打印 0
  }
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => handleChange()}>增加</button>
      <button onClick={() => handleChange()}>减少</button>

    </div>
  )
}

export default App;