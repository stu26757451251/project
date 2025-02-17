import Icon from '@/components/common/Icon'
import { ICON } from '@/enum/icon'

interface ButtonProps {
  dataTestId: string
  className: string
  onClick: () => void
  name?: string
  icon?: ICON
  iconSize?: number
}

export default function Button({
  dataTestId,
  className,
  onClick,
  name,
  icon,
  iconSize
}: Readonly<ButtonProps>) {
  return (
    <button key={dataTestId} className={className} onClick={onClick}>
      {icon && <Icon className={'w-8 h-8'} icon={icon} size={iconSize} />}
      {name && name}
    </button>
  )
}
