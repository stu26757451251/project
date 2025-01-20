'use client'
import { ReactNode } from 'react'
import { TaskPanel } from '../tasks/task-panel'
import { currentTaskAtom, leftPanelVisibleAtom } from '@/atoms/atoms'
import { useAtomValue } from 'jotai'
import * as TSP from 'ts-pattern'
import LeftPanel from '../left-panel'

export default function Content({ children }: { children: ReactNode }) {
  const currentTask = useAtomValue(currentTaskAtom)
  const leftPanelVisible = useAtomValue(leftPanelVisibleAtom)

  const contentShrinkSize = TSP.match([leftPanelVisible, currentTask])
    .with([false, TSP.Pattern.nullish], () => 'w-[calc(100%-50px)]')
    .with([false, TSP.Pattern.nonNullable], () => 'w-[calc(100%-550px)]')
    .with([true, TSP.Pattern.nullish], () => 'w-[calc(100%-200px)]')
    .with([true, TSP.Pattern.nonNullable], () => 'w-[calc(100%-700px)]')
    .exhaustive()

  return (
    <div className="relative w-full h-full overflow-x-hidden">
      <LeftPanel />
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
  )
}
