'use client'
import { currentTaskAtom, isResizingAtom, panelWidth } from '@/atoms/atoms'
import Button from '@/components/common/Button'
import { ICON } from '@/enum/icon'
import { useAtom } from 'jotai'
import TaskField, { FIELD_TYPE } from './TaskField'
import {
  emergencyColorMap,
  frequencyColorMap,
  frequencyIconMap,
  importantColorMap
} from '@/utils/color-map'
import { Task } from '@/types/tasks/task'

export function TaskPanel() {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)
  const [isResizing, setIsResizing] = useAtom(isResizingAtom)
  const [width, setWidth] = useAtom(panelWidth)

  const closeTaskPanel = () => {
    setCurrentTask(null)
    setWidth(500)
  }

  const handleMouseDown = () => {
    setIsResizing(true)
  }

  const renderTaskFields = (task: Task) => {
    const { name, description, dueDate, priority, frequency, emergency, important } = task

    return (
      <>
        <Button
          dataTestId="collapse-task-panel-button"
          className={`justify-self-start place-self-start m-2 col-start-1`}
          onClick={() => closeTaskPanel()}
          icon={ICON.ARROW_RIGHT}
          iconSize={32}></Button>
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
      </>
    )
  }

  return (
    <div
      data-testid="task-panel"
      style={{
        width: currentTask ? `${width}px` : `0px`,
        minWidth: currentTask ? `500px` : `0px`
      }}
      className={`grid grid-cols-7 bg-white shadow-xl border-l border-gray-200 absolute top-0 right-0 h-full
        ${isResizing ? '' : 'task-panel-transition'}
        `}>
      {currentTask && (
        <>
          <div
            data-testid="resizer"
            onMouseDown={handleMouseDown}
            className="resizer w-[12px] ml-[-6px] absolute top-0 left-0 h-full cursor-ew-resize"></div>
          {renderTaskFields(currentTask)}
        </>
      )}
    </div>
  )
}
