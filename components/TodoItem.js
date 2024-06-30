import { FaTimes } from 'react-icons/fa'; 

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="todo-toggle"
      />
      <span className={`todo-text ${todo.completed ? 'todo-completed' : ''}`}>
        {todo.text}
      </span>
      <button onClick={onDelete} className="todo-delete" aria-label="Delete todo">
        <FaTimes />
      </button>
    </li>
  )
}


export default TodoItem
