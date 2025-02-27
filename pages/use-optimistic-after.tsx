'use client'

import { startTransition, useOptimistic, useRef, useState } from 'react'

interface Todo {
  id: string
  text: string
  loading?: boolean
}

async function apiUploadTodo(text: string): Promise<Todo> {
  // Return todo item after 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: Math.random().toString(36).slice(2, 9),
    text
  }
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(todos, (state, text) => [
    ...state,
    {
      id: Math.random().toString(36).slice(2, 9),
      text,
      loading: true
    }
  ])
  const textFieldRef = useRef<HTMLInputElement>(null)

  async function onClick() {
    startTransition(async () => {
      if (textFieldRef.current === null) {
        return
      }

      addOptimisticTodo(textFieldRef.current?.value || '')
      const resultItem = await apiUploadTodo(textFieldRef.current?.value || '')
      setTodos((todos) => [...todos, resultItem])
    })
  }

  return (
    <>
      <input type='text' name='todo' placeholder='New Todo' ref={textFieldRef} />
      <button onClick={onClick}>Add</button>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.loading && <small> (Adding...)</small>}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
