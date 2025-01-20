'use client'
import { currentTaskAtom } from '@/atoms/atoms'
import { Task } from '@/types/tasks/task'
import dayjs from 'dayjs'
import { useSetAtom } from 'jotai'
import { FaClock } from 'react-icons/fa6'

type TaskCardProps = {
  dataTestId: string
  task: Task
}

export const formatDate = (date: Date): string => dayjs(date).format('YYYY/MM/DD')

export default function TaskCard({ task, dataTestId }: TaskCardProps) {
  const setCurrentTask = useSetAtom(currentTaskAtom)

  const { name, dueDate, priority, emergency, important, frequency } = task
  const hasTags = (task: Task): boolean =>
    task.emergency !== undefined || task.important !== undefined || task.frequency !== undefined

  return (
    <button
      className="grid text-left border rounded-xl px-4 gap-y-2 py-3 my-2 shadow-sm hover:bg-slate-100 duration-200"
      onClick={() => setCurrentTask(task)}
      data-testid={dataTestId}>
      <span className="block font-bold text-base">{name}</span>
      {dueDate && <span className="block font-light text-sm">Due Date: {formatDate(dueDate)}</span>}
      {priority && <span className="block font-light text-sm">Priority: {priority}</span>}
      {hasTags(task) && (
        <div className="flex">
          {emergency && (
            <span className="rounded p-[5px] text-xs mr-2 bg-green-200 text-green-900">
              {emergency}
            </span>
          )}
          {important && (
            <span className="rounded p-[5px] text-xs mr-2 bg-red-200 text-red-900">
              {important}
            </span>
          )}
          {frequency && (
            <span className="inline-flex items-center rounded p-[5px] text-xs mr-2 bg-slate-200 text-slate-900">
              <FaClock size="14" className="mr-1 flex-shrink-0" />
              {frequency}
            </span>
          )}
        </div>
      )}
    </button>
  )
}
