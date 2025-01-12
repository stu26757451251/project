import axios, { AxiosError } from 'axios'
import React from 'react'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

enum CATEGORY {
  READING = 'reading',
  EXERCISE = 'exercise',
  CHORE = 'chore'
}

type Todo = {
  name: string
  description: string
  category: CATEGORY
}

type GetTodoResponse = {
  todos: Array<Todo>
}

type GetTodoError = {
  _tag: string
  message: string
}

const errorResponseOf = (error: AxiosError) => {
  console.log(error)
  return getTodoErrorOf(error.message)
}

const getTodoErrorOf = (message: string): GetTodoError => ({
  _tag: 'GetTodoError',
  message
})

axios.defaults.baseURL = 'http://localhost:3000'

export default async function TodoList() {
  const getTodos: TE.TaskEither<GetTodoError, GetTodoResponse> = TE.tryCatch(
    // validate the resposne matching
    () => axios.get<GetTodoResponse>(`/todos`).then((response) => response.data),
    (error) => errorResponseOf(error as AxiosError)
  )

  const todoList = await pipe(
    getTodos,
    TE.match(
      (error) => {
        console.error('Error occur when GetTodoList :', error)
        return []
      },
      ({ todos }) => todos
    )
  )()

  return (
    <div className="h-full flex justify-center items-center">
      <div
        data-testid="todo-list"
        className="flex flex-col p-5 border border-sold m-5 min-w-[300px] min-h-[400px]">
        <div className="font-semibold text-lg pb-8">
          <span>Todo List</span>
        </div>
        {todoList.map((task, index) => (
          <div key={`task-${index}`} data-testid="task" className="select-none">
            <input type="checkbox" id={task.name} name={task.name} className="m-2" />
            <label htmlFor={task.name}>{task.name}</label>
          </div>
        ))}
      </div>
      <div
        data-testid="done-list"
        className="flex flex-col p-5 border border-solid m-5 min-w-[300px] min-h-[400px]">
        <div className="font-semibold text-lg pb-8">
          <span>Done List</span>
        </div>
      </div>
    </div>
  )
}
