import React from 'react'
import { pipe } from 'fp-ts/function'
import { getTasks } from '@/services/task'
import * as TE from 'fp-ts/TaskEither'
import { STATUS } from '@/types/tasks/task'
import CategoryColumn from '@/components/tasks/category-column'
import { COLOR } from '@/enum/color'
import TodoListContainer from '@/components/TodoListContainer'

/*
  1. 
  User can category by themselves, 
  the value of key seems to be a list of string,
  so that it will be grouped by all the keys in list

  2.
  User can define the color of tags by themselves

*/

function groupByEnum<T, K extends keyof T>(
  list: T[],
  enumObject: Record<string, string>,
  key: K
): Record<string, T[]> {
  // 初始化結果物件，確保所有 enum 值都有空陣列
  const grouped: Record<string, T[]> = {}
  for (const enumKey in enumObject) {
    if (Object.prototype.hasOwnProperty.call(enumObject, enumKey)) {
      grouped[enumObject[enumKey]] = []
    }
  }

  // 分組任務
  for (const item of list) {
    const groupKey = item[key] as unknown as string
    if (grouped[groupKey]) {
      grouped[groupKey].push(item)
    }
  }

  return grouped
}

export default async function TodoList() {
  const todoList = await pipe(
    getTasks,
    TE.match(
      (error) => {
        console.error('Error occur when GET /tasks :', error)
        return []
      },
      ({ tasks }) => tasks
    )
  )()

  const totalNumber = todoList.length
  const tasksGroupByStatus = groupByEnum(todoList, STATUS, 'status')

  return (
    <TodoListContainer>
      <div className="h-full flex">
        <CategoryColumn
          title={STATUS.TODO}
          color={COLOR.CURIOUS_BLUE}
          tasks={tasksGroupByStatus[STATUS.TODO]}
          totalNumber={totalNumber}
        />
        <CategoryColumn
          title={STATUS.IN_PROGRESS}
          color={COLOR.OASIS}
          tasks={tasksGroupByStatus[STATUS.IN_PROGRESS]}
          totalNumber={totalNumber}
        />
        <CategoryColumn
          title={STATUS.WAITING}
          color={COLOR.GRAY}
          tasks={tasksGroupByStatus[STATUS.WAITING]}
          totalNumber={totalNumber}
        />
        <CategoryColumn
          title={STATUS.DONE}
          color={COLOR.GREEN}
          tasks={tasksGroupByStatus[STATUS.DONE]}
          totalNumber={totalNumber}
        />
      </div>
    </TodoListContainer>
  )
}
