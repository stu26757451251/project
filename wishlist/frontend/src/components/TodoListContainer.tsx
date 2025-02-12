'use client'
import { ReactNode, useState, MouseEvent } from 'react'
import { TaskPanel } from './tasks/task-panel'
import { currentTaskAtom, isResizingAtom, leftPanelVisibleAtom, panelWidth } from '@/atoms/atoms'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import * as TSP from 'ts-pattern'
import LeftPanel from './left-panel'
import clsx from 'clsx'

export default function TodoListContainer({ children }: { children: ReactNode }) {
  const currentTask = useAtomValue(currentTaskAtom)
  const leftPanelVisible = useAtomValue(leftPanelVisibleAtom)
  const [width, setWidth] = useAtom(panelWidth)
  const [isResizing, setIsResizing] = useAtom(isResizingAtom)

  const contentWidth = TSP.match([leftPanelVisible, currentTask])
    .with([false, TSP.Pattern.nullish], () => 'w-[calc(100%-50px)]')
    .with([false, TSP.Pattern.nonNullable], () => `w-[calc(100%-${width}px)]`)
    .with([true, TSP.Pattern.nullish], () => 'w-[calc(100%-200px)]')
    .with([true, TSP.Pattern.nonNullable], () => `w-[calc(100%-${width + 200}px)]`)
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
      <div className={`${contentWidth}`}>{children}</div>
      <TaskPanel />
    </div>
  )
}
