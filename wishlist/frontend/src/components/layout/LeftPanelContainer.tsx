'use client'
import { ReactNode } from 'react'
import { leftPanelVisibleAtom } from '@/atoms/atoms'
import { useAtomValue } from 'jotai'
import LeftPanel from './LeftPanel'
import clsx from 'clsx'

export default function LeftPanelContainer({ children }: { children: ReactNode }) {
  const leftPanelVisible = useAtomValue(leftPanelVisibleAtom)

  return (
    <div className="relative w-full h-full overflow-x-hidden">
      <LeftPanel />
      <div
        data-testid="content"
        className={clsx(
          'absolute left-[50px] shrink h-full left-panel-container-transition',
          leftPanelVisible ? 'left-panel-expanded' : 'left-panel-collapsed'
        )}>
        {children}
      </div>
    </div>
  )
}
