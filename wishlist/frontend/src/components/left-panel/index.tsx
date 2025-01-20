import { ICON } from '@/enum/icon'
import Button from '@/components/button'
import { useAtom } from 'jotai'
import { leftPanelVisibleAtom } from '@/atoms/atoms'

export default function LeftPanel({}) {
  const [panelVisible, setPanelVisible] = useAtom(leftPanelVisibleAtom)
  const switchPanelVisible = () => setPanelVisible(!panelVisible)

  return (
    <div
      data-testid="left-panel"
      className={`grid absolute w-[200px] h-full bg-slate-200 duration-500 ease-out transition-all
         ${!panelVisible && '-translate-x-[150px]'}`}>
      <Button
        dataTestId="collapse-left-panel-button"
        className={`justify-self-end place-self-end duration-500 m-2 ${panelVisible && 'rotate-180'}`}
        onClick={switchPanelVisible}
        icon={ICON.ARROW_RIGHT}></Button>
    </div>
  )
}
