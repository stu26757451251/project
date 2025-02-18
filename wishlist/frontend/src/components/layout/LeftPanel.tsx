import { ICON } from '@/enum/icon'
import { useAtom } from 'jotai'
import { leftPanelVisibleAtom } from '@/atoms/atoms'
import Button from '@/components/common/Button'
import clsx from 'clsx'

export default function LeftPanel() {
  const [panelVisible, setPanelVisible] = useAtom(leftPanelVisibleAtom)
  const switchPanelVisible = () => setPanelVisible(!panelVisible)

  return (
    <div
      data-testid="left-panel"
      className={clsx(
        'grid absolute w-[200px] h-full bg-slate-200 left-panel-transition',
        panelVisible ? '' : '-translate-x-[150px]'
      )}>
      <Button
        dataTestId="collapse-left-panel-button"
        className={clsx(
          'justify-self-end place-self-end duration-500 m-2',
          panelVisible && 'rotate-180'
        )}
        onClick={switchPanelVisible}
        icon={ICON.ARROW_RIGHT}
        iconSize={32}></Button>
    </div>
  )
}
