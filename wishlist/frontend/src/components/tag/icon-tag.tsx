import { COLOR } from '@/enum/color'
import { ICON } from '@/enum/icon'
import { FaClock } from 'react-icons/fa6'
import * as TSP from 'ts-pattern'
import Icon from '../icon'

type IconTagProps = {
  icon: ICON
  color: COLOR
  text: string
}

const colorToStyle = (
  color: COLOR
): {
  backgroundColor: string
  textColor: string
} =>
  TSP.match(color)
    .with(COLOR.CURIOUS_BLUE, () => ({
      backgroundColor: 'bg-curious-blue-200',
      textColor: 'text-curious-blue-900'
    }))
    .with(COLOR.OASIS, () => ({
      backgroundColor: 'bg-oasis-200',
      textColor: 'text-oasis-900'
    }))
    .with(COLOR.GRAY, () => ({
      backgroundColor: 'bg-gray-200',
      textColor: 'text-gray-900'
    }))
    .with(COLOR.GREEN, () => ({
      backgroundColor: 'bg-green-200',
      textColor: 'text-green-900'
    }))
    .with(COLOR.RED, () => ({
      backgroundColor: 'bg-red-200',
      textColor: 'text-red-900'
    }))
    .with(COLOR.SLATE, () => ({
      backgroundColor: 'bg-slate-200',
      textColor: 'text-slate-900'
    }))
    .exhaustive()

export default function IconTag({ icon, color, text }: IconTagProps) {
  const { backgroundColor, textColor } = colorToStyle(color)
  return (
    <span
      className={`inline-flex items-center rounded p-[5px] text-xs mr-2 ${backgroundColor} ${textColor}`}>
      <Icon classname="mr-1 flex-shrink-0" icon={icon} />
      {text}
    </span>
  )
}
