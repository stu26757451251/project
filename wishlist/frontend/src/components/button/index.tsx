import Icon from '@/components/icon'
import { ICON } from '@/enum/icon'

interface ButtonProps {
  dataTestId: string
  className: string
  onClick: () => void
  name?: string
  icon?: ICON
}

export default function Button({
  dataTestId,
  className,
  onClick,
  name,
  icon
}: Readonly<ButtonProps>) {
  return (
    <button key={dataTestId} className={className} onClick={onClick}>
      {icon && <Icon classname={'w-8 h-8'} icon={ICON.ARROW_RIGHT} />}
      {name && name}
    </button>
  )
}
