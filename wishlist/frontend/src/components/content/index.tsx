'use client'
import { ReactNode } from 'react'
import { leftPanelVisibleAtom } from '@/atoms/atoms'
import { useAtomValue } from 'jotai'
import LeftPanel from '../left-panel'

export default function Content({ children }: { children: ReactNode }) {
  const leftPanelVisible = useAtomValue(leftPanelVisibleAtom)

  return (
    <div className="relative w-full h-full overflow-x-hidden">
      <LeftPanel />
      <div
        data-testid="main-content"
        className={`
        absolute overflow-x-auto left-[50px] shrink h-full
        duration-500 ease-out transition-all
        ${leftPanelVisible ? `translate-x-[150px] w-[calc(100%-200px)]` : 'w-[calc(100%-50px)]'}
      `}>
        {/* <div className="overflow-x-hidden"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  )
}
