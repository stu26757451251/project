'use client'
import { currentTaskAtom } from '@/atoms/atoms'
import Button from '@/components/button'
import { ICON } from '@/enum/icon'
import { pipe } from 'fp-ts/lib/function'
import { useAtom } from 'jotai'
import * as O from 'fp-ts/Option'
import TaskField, { FIELD_TYPE } from '../task-field'
import {
  emergencyColorMap,
  frequencyColorMap,
  frequencyIconMap,
  importantColorMap
} from '@/utils/color-map'

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
            className="grid content-start col-start-2 col-span-5 mt-20 gap-y-3">
            <div data-testid="task-title" className="font-bold text-3xl pb-10 min-h-[120px]">
              {name}
            </div>
            <TaskField title="Priority" type={FIELD_TYPE.NUMBER} value={priority} />
            <TaskField title="Due Date" type={FIELD_TYPE.DATE} value={dueDate} />
            <TaskField
              title="Emergency"
              type={FIELD_TYPE.COLOR_TAG}
              color={emergencyColorMap}
              value={emergency}
            />
            <TaskField
              title="Important"
              type={FIELD_TYPE.COLOR_TAG}
              color={importantColorMap}
              value={important}
            />
            <TaskField
              title="Frequency"
              type={FIELD_TYPE.ICON_TAG}
              color={frequencyColorMap}
              icon={frequencyIconMap}
              value={frequency}
            />
            <TaskField title="Description" type={FIELD_TYPE.STRING} value={description} />
          </div>
        </div>
      )
    )
  )
}
