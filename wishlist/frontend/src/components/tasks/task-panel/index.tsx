'use client'
import { currentTaskAtom } from '@/atoms/atoms'
import Button from '@/components/button'
import { ICON } from '@/enum/icon'
import { pipe } from 'fp-ts/lib/function'
import { useAtom } from 'jotai'
import * as O from 'fp-ts/Option'
import TaskLabel from '../task-label'
import { formatDate } from '../task-card'

export function TaskPanel() {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)
  return pipe(
    currentTask,
    O.fromNullable,
    O.match(
      () => <div></div>,
      ({ name, priority, dueDate, emergency, important, frequency, description }) => (
        <div
          data-testid="task-panel"
          className={`grid grid-cols-7 bg-white absolute w-[500px] right-[-500px] 
          translate-x-[-500px] h-full shadow-sm border-l transition-all duration-300
          `}>
          <Button
            dataTestId="collapse-task-panel-button"
            className={`justify-self-start place-self-start m-2 col-start-1`}
            onClick={() => setCurrentTask(null)}
            icon={ICON.ARROW_RIGHT}></Button>
          <div
            data-testid="task-content"
            className="grid content-start col-start-2 col-span-5 mt-20 gap-y-2">
            <div className="font-bold text-3xl pb-4">{name}</div>
            <TaskLabel title="Priority" value={priority ? `${priority}` : undefined} />
            <TaskLabel title="Due Date" value={dueDate && formatDate(dueDate)} />
            <TaskLabel title="Emergency" value={emergency} />
            <TaskLabel title="Important" value={important} />
            <TaskLabel title="Frequency" value={frequency} />
            <TaskLabel title="Description" value={description} />
          </div>
        </div>
      )
    )
  )
}
