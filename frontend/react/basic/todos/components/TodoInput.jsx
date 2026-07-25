// 表单交互组件
import { useState } from 'react';

const TodoInput = ({onAdd}) => {
  // 共享状态只有父组件持有 
  const [inputValue,setInputValue] = useState("");
  // 当需要报告父组件的时候，执行
  const handleSubmit = (e)=>{
    e.preventDefault();
    onAdd(inputValue);
    setInputValue("");
  }
  return (
    <form>
        <input type="text" value={inputValue} onChange={e=>setInputValue(e.target.value)} placeholder="请输入任务" autoFocus />
        <button type="submit">Add</button>
    </form>
  )
}

export default TodoInput