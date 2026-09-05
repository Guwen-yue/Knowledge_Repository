const TodoStats = ({ total, active, completed, onClearCompleted }) => {
  return (
    <div className="todo-stats">
      <span>总计: {total}</span>
      <span>待完成: {active}</span>
      <span>已完成: {completed}</span>
      {completed > 0 && (
        <button onClick={onClearCompleted}>清除已完成</button>
      )}
    </div>
  );
};

export default TodoStats;
