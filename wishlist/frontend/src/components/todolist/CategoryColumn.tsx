import DotTag from '@/components/common/tag/DotTag'
import TaskCard from '@/components/todolist/TaskCard'
import { Task } from '@/types/tasks/task'
import { COLOR } from '@/enum/color'

type CategoryColumnProps = {
  title: string
  color: COLOR
  tasks: Array<Task>
  totalNumber: number
}

export default function CategoryColumn({ title, color, tasks, totalNumber }: CategoryColumnProps) {
  return (
    <div
      data-testid={`${title}-list`}
      className="flex flex-col p-5 m-5 min-w-[300px] min-h-[400px]">
      <div className="font-semibold text-base pb-2 flex justify-between">
        <DotTag color={color} text={title} />
        <span data-testid={`${title}-count`} className="font-medium text-gray-400">
          {tasks.length}/{totalNumber}
        </span>
      </div>
      {tasks.map((task, index) => (
        <TaskCard
          key={`${title}-task-${index}`}
          dataTestId={`${title}-task-${index}`}
          task={task}
        />
      ))}
    </div>
  )
}
