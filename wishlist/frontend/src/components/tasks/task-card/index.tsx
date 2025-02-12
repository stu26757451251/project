'use client'
import { currentTaskAtom } from '@/atoms/atoms'
import ColorTag from '@/components/tag/color-tag'
import IconTag from '@/components/tag/icon-tag'
import { COLOR } from '@/enum/color'
import { ICON } from '@/enum/icon'
import { EMERGENCY, IMPORTANT, Task } from '@/types/tasks/task'
import { emergencyColorMap, importantColorMap } from '@/utils/color-map'
import { formatDate } from '@/utils/date'
import { useSetAtom } from 'jotai'

type TaskCardProps = {
  dataTestId: string
  task: Task
}

export default function TaskCard({ task, dataTestId }: TaskCardProps) {
  const setCurrentTask = useSetAtom(currentTaskAtom)

  const { name, dueDate, priority, emergency, important, frequency } = task
  const hasTags = (task: Task): boolean =>
    task.emergency !== undefined || task.important !== undefined || task.frequency !== undefined

  return (
    <button
      className="grid text-left border border-gray-200 rounded-xl px-4 gap-y-2 py-3 my-2 shadow-sm hover:bg-slate-100 duration-200"
      onClick={() => setCurrentTask(task)}
      data-testid={dataTestId}>
      <span className="block font-bold text-base">{name}</span>
      {dueDate && <span className="block font-light text-sm">Due Date: {formatDate(dueDate)}</span>}
      {priority && <span className="block font-light text-sm">Priority: {priority}</span>}
      {hasTags(task) && (
        <div className="flex">
          {emergency === EMERGENCY.EMERGENCY && (
            <ColorTag color={emergencyColorMap[emergency]} text={emergency} />
          )}
          {important === IMPORTANT.IMPORTANT && (
            <ColorTag color={importantColorMap[important]} text={important} />
          )}
          {frequency && <IconTag icon={ICON.CLOCK} color={COLOR.SLATE} text={frequency} />}
        </div>
      )}
    </button>
  )
}
