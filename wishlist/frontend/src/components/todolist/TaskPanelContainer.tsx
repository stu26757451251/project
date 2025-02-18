'use client'
import { ReactNode, MouseEvent } from 'react'
import { TaskPanel } from '@/components/todolist/TaskPanel'
import {
  TASK_PANEL_MIN_WIDTH,
  currentTaskAtom,
  isResizingAtom,
  taskPanelWidthAtom
} from '@/atoms/atoms'
import { useAtom, useAtomValue } from 'jotai'
import * as TSP from 'ts-pattern'

export default function TaskPanelContainer({ children }: { children: ReactNode }) {
  const currentTask = useAtomValue(currentTaskAtom)
  const [width, setWidth] = useAtom(taskPanelWidthAtom)
  const [isResizing, setIsResizing] = useAtom(isResizingAtom)

  const contentWidth = TSP.match(currentTask)
    .with(TSP.P.nullish, () => 'calc(100%)')
    .with(TSP.P.nonNullable, () => `calc(100% - ${width}px)`)
    .exhaustive()

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    const newWidth = window.innerWidth - e.clientX
    const maxWidth = window.innerWidth * 0.6
    if (newWidth > TASK_PANEL_MIN_WIDTH && newWidth < maxWidth) {
      setWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false)
    }
  }

  return (
    <div
      data-testid="resizable-container"
      className="h-full flex"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <div
        data-testid="task-board"
        style={{ width: contentWidth }}
        className="overflow-x-auto h-full">
        {children}
      </div>
      <TaskPanel />
    </div>
  )
}
