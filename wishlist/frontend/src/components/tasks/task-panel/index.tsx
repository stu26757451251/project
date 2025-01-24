'use client'
import { currentTaskAtom } from '@/atoms/atoms'
import Button from '@/components/button'
import { ICON } from '@/enum/icon'
import { pipe } from 'fp-ts/lib/function'
import { useAtom } from 'jotai'
import * as O from 'fp-ts/Option'
import TaskLabel, { FIELD_TYPE } from '../task-label'
import { emergencyColorMap, importantColorMap } from '@/utils/color-map'

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
            {priority && <TaskLabel title="Priority" type={FIELD_TYPE.NUMBER} value={priority} />}
            {dueDate && <TaskLabel title="Due Date" type={FIELD_TYPE.DATE} value={dueDate} />}
            {emergency && (
              <TaskLabel
                title="Emergency"
                type={FIELD_TYPE.COLOR_TAG}
                color={emergencyColorMap[emergency]}
                value={emergency}
              />
            )}
            {important && (
              <TaskLabel
                title="Important"
                type={FIELD_TYPE.COLOR_TAG}
                color={importantColorMap[important]}
                value={important}
              />
            )}
            {/* {frequency && <TaskLabel title="Frequency" type={} value={frequency} />} */}
            <TaskLabel title="Description" type={FIELD_TYPE.STRING} value={description} />
          </div>
        </div>
      )
    )
  )
}
