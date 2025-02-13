import { COLOR } from '@/enum/color'
import * as TSP from 'ts-pattern'

type ColorTagProps = {
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
    .with(COLOR.CINNABAR, () => ({
      backgroundColor: 'bg-cinnabar-200',
      textColor: 'text-cinnabar-900'
    }))
    .exhaustive()

export default function ColorTag({ color, text }: ColorTagProps) {
  const { backgroundColor, textColor } = colorToStyle(color)
  return (
    <span className={`rounded p-[5px] text-xs mr-2 ${backgroundColor} ${textColor}`}>{text}</span>
  )
}
