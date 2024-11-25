'use client'
import Button from '@/components/button'
import Icon from '@/components/icon'
import Content from '@/components/main-content/content'
import Title from '@/components/main-content/title'
import { ICON } from '@/enum/icon'
import { g } from '@/test'
import { useState } from 'react'

export default function Page() {
  const [panelVisible, setPanelVisible] = useState<boolean>(false)
  const showLeftPanel = () => setPanelVisible(!panelVisible)

  type DataType = {
    gender: string
    id: string
    name: string
    date: string
  }
  const data: DataType[] = [
    {
      gender: 'female',
      id: 'AESPA',
      name: 'supernova',
      date: '5/12'
    },
    {
      gender: 'female',
      id: 'AESPA',
      name: 'drama',
      date: '4/10'
    },
    {
      gender: 'female',
      id: 'AESPA',
      name: 'next level',
      date: '4/10'
    },
    {
      gender: 'female',
      id: 'IVE',
      name: 'iam',
      date: '4/9'
    },
    {
      gender: 'female',
      id: 'IVE',
      name: 'accendio',
      date: '5/20'
    },
    {
      gender: 'male',
      id: 'GD',
      name: 'palatte',
      date: '1/20'
    },
    {
      gender: 'male',
      id: 'GD',
      name: 'blue',
      date: '1/20'
    },
    {
      gender: 'male',
      id: 'GD',
      name: 'tonight',
      date: '1/20'
    },
    {
      gender: 'male',
      id: 'GD',
      name: 'crooked',
      date: '1/20'
    }
  ]

  console.log('-----------------------')
  const grouped = Object.groupBy(data, ({ gender }) => gender)
  console.log(grouped)

  const level2 = Object.keys(grouped).map((key: string) => {
    const dataTypeArray = grouped[key] as DataType[]
    const g = Object.groupBy(dataTypeArray, ({ id }) => id)
    console.log(g)
    return g
  })

  console.log('level2: ', level2)

  return (
    <div className="">
      <>
        <div
          data-testid="left-panel"
          className={`absolute w-[200px] h-[calc(100%-60px)] bg-slate-200 left-0 duration-500 ease-out transition-all ${!panelVisible && '-translate-x-[200px]'}`}></div>
        <div
          data-testid="main-content"
          className={`pt-1 pl-1 grid justify-items-stretch shrink duration-500 ease-out transition-all ${panelVisible ? 'translate-x-[200px] w-[calc(100%-200px)]' : 'w-full'}`}>
          <Button
            dataTestId="collapse-left-panel-button"
            className={`justify-self-start duration-500 ${panelVisible && 'rotate-180'}`}
            onClick={showLeftPanel}
            icon={ICON.ARROW_RIGHT}
          />
          <div data-testid="wish-content" className="justify-self-center">
            <Title title="Try To Go To Bed Before 12 O'Clock" />
            <Content />
          </div>
        </div>
      </>
    </div>
  )
}
