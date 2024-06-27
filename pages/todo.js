import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import TodoItem from '../components/TodoItem'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetchTodos()
    }
  }, [session])

  const fetchTodos = async () => {
    const res = await fetch('/api/todos', {
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success) {
      setTodos(data.todos)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
      credentials: 'include'
    })

    const data = await res.json()
    if (data.success) {
      setTodos([...todos, data.todo])
      setNewTodo('')
    }
  }

  const toggleTodo = async (id) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todos.find(todo => todo._id === id).completed }),
      credentials: 'include'
    })

    const data = await res.json()
    if (data.success) {
      setTodos(todos.map(todo => todo._id === id ? data.todo : todo))
    }
  }

  const deleteTodo = async (id) => {
    const res = await fetch(`/api/todos/${id}`, { 
      method: 'DELETE',
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success) {
      setTodos(todos.filter(todo => todo._id !== id))
    }
  }

  if (!session) {
    return <Layout><p>Please sign in to view your To-Do list.</p></Layout>
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5" style={{ color: 'var(--primary-red)' }}>Your To-Do List</h1>
        <form onSubmit={addTodo} className="mb-5">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="btn mt-2 w-full">
            Add Todo
          </button>
        </form>
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={() => toggleTodo(todo._id)}
              onDelete={() => deleteTodo(todo._id)}
            />
          ))}
        </ul>
      </div>
    </Layout>
  )
}
