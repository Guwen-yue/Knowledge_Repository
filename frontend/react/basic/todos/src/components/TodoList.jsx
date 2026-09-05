const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => onDelete(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
