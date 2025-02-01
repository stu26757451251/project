'use client'
import { ReactNode, useState, MouseEvent } from 'react'
import { TaskPanel } from '../tasks/task-panel'
import { currentTaskAtom, isResizingAtom, leftPanelVisibleAtom, panelWidth } from '@/atoms/atoms'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import * as TSP from 'ts-pattern'
import LeftPanel from '../left-panel'

export default function Content({ children }: { children: ReactNode }) {
  const currentTask = useAtomValue(currentTaskAtom)
  const leftPanelVisible = useAtomValue(leftPanelVisibleAtom)
  const setWidth = useSetAtom(panelWidth)
  const [isResizing, setIsResizing] = useAtom(isResizingAtom)

  const contentShrinkSize = TSP.match([leftPanelVisible, currentTask])
    .with([false, TSP.Pattern.nullish], () => 'w-[calc(100%-50px)]')
    .with([false, TSP.Pattern.nonNullable], () => 'w-[calc(100%-550px)]')
    .with([true, TSP.Pattern.nullish], () => 'w-[calc(100%-200px)]')
    .with([true, TSP.Pattern.nonNullable], () => 'w-[calc(100%-700px)]')
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
    <div className="relative w-full h-full overflow-x-hidden">
      <LeftPanel />
      <div
        data-testid="resizable-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        <div
          data-testid="main-content"
          className={`
        absolute overflow-x-auto left-[50px] shrink h-full 
        duration-500 ease-out transition-all
        ${contentShrinkSize}
        ${leftPanelVisible ? `translate-x-[150px]` : ''}
      `}>
          {children}
        </div>
        <TaskPanel />
      </div>
    </div>
  )
}
