'use client'
import { ReactNode, MouseEvent } from 'react'
import { TaskPanel } from '@/components/todolist/TaskPanel'
import { currentTaskAtom, isResizingAtom, leftPanelVisibleAtom, panelWidth } from '@/atoms/atoms'
import { useAtom, useAtomValue } from 'jotai'
import * as TSP from 'ts-pattern'

export default function TodoListContainer({ children }: { children: ReactNode }) {
  const currentTask = useAtomValue(currentTaskAtom)
  const leftPanelVisible = useAtomValue(leftPanelVisibleAtom)
  const [width, setWidth] = useAtom(panelWidth)
  const [isResizing, setIsResizing] = useAtom(isResizingAtom)

  const contentWidth = TSP.match(currentTask)
    .with(TSP.P.nullish, () => 'calc(100%)')
    .with(TSP.P.nonNullable, () => `calc(100% - ${width}px)`)
    .exhaustive()

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    const newWidth = window.innerWidth - e.clientX
    if (newWidth > 500 && newWidth < 1000) {
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
