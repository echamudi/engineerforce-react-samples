'use client'

import { useRef, useState } from 'react'

interface Todo {
  id: string
  text: string
}

async function apiUploadTodo(text: string): Promise<Todo> {
  // Simulate API latency with a 1-second delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    id: Math.random().toString(36).slice(2, 9),
    text
  }
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const textFieldRef = useRef<HTMLInputElement>(null)

  async function onClick() {
    const addedTodo = await apiUploadTodo(textFieldRef.current?.value || '')
    setTodos((todos) => [...todos, addedTodo])
  }

  return (
    <>
      <input type='text' name='todo' placeholder='New Todo' ref={textFieldRef} />
      <button onClick={onClick}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
