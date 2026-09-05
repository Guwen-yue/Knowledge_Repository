import { useState } from 'react';

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新的待办事项..."
      />
      <button type="submit">添加</button>
    </form>
  );
};

export default TodoInput;
