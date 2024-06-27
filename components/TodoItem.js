const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="card">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="mr-2"
      />
      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
        {todo.text}
      </span>
      <button onClick={onDelete} className="btn" style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  )
}

export default TodoItem
