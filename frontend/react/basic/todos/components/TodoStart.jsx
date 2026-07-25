//
const TodoStart = ({total,active,completedCount,clearCompleted})=>{
 return (
  <div className="todo-start">
    <p>当前有{total}条任务</p>
    <p>其中{active}条未完成任务</p>
      <p>{completedCount}条已完成任务</p>
      {completedCount >0&&(<button onClick={clearCompleted}>清除已完成任务</button>)}
  </div>
 ) 
}

export default TodoStart;
