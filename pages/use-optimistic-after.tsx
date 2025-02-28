'use client'

import { startTransition, useOptimistic, useRef, useState } from 'react'

interface Todo {
  id: string
  text: string
  loading?: boolean
}

async function apiUploadTodo(text: string): Promise<Todo> {
  // 1秒の遅延で API レイテンシーをシミュレーション
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

      // 楽観的に UI を更新する
      addOptimisticTodo(textFieldRef.current?.value || '')
      // 非同期処理を実行する
      const resultItem = await apiUploadTodo(textFieldRef.current?.value || '')
      // 楽観的なエントリーを実際のデータに置き換える
      setTodos((todos) => [...todos, resultItem])
    })
  }

  return (
    <>
      <input type='text' name='todo' placeholder='New Todo' ref={textFieldRef} />
      <button onClick={onClick}>追加</button>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.loading && <small> (追加中...)</small>}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList