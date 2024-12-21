'use client'
import { ReactNode, useState } from 'react'
import Button from '../button'
import { ICON } from '@/enum/icon'

export default function Content({ children }: { children: ReactNode }) {
  const [panelVisible, setPanelVisible] = useState<boolean>(false)
  const showLeftPanel = () => setPanelVisible(!panelVisible)

  return (
    <div className="relative w-full h-full">
      <div
        data-testid="left-panel"
        className={`grid absolute w-[200px] h-full bg-slate-200 duration-500 ease-out transition-all ${!panelVisible && '-translate-x-[150px]'}`}>
        <Button
          dataTestId="collapse-left-panel-button"
          className={`justify-self-end place-self-end duration-500 m-2 ${panelVisible && 'rotate-180'}`}
          onClick={showLeftPanel}
          icon={ICON.ARROW_RIGHT}></Button>
      </div>
      <div
        data-testid="main-content"
        className={`absolute left-[50px] shrink h-full duration-500 ease-out transition-all ${panelVisible ? 'translate-x-[150px] w-[calc(100%-200px)]' : 'w-[calc(100%-50px)]'}`}>
        {children}
      </div>
    </div>
  )
}
