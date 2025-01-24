import { COLOR } from '@/enum/color'
import * as TSP from 'ts-pattern'

type DotTagProps = {
  color: COLOR
  text: string
}

const colorToStyle = (
  color: COLOR
): {
  backgroundColor: string
  dotColor: string
  textColor: string
} =>
  TSP.match(color)
    .with(COLOR.CURIOUS_BLUE, () => ({
      backgroundColor: 'bg-curious-blue-100',
      dotColor: 'bg-curious-blue-400',
      textColor: 'text-curious-blue-800'
    }))
    .with(COLOR.OASIS, () => ({
      backgroundColor: 'bg-oasis-100',
      dotColor: 'bg-oasis-400',
      textColor: 'text-oasis-950'
    }))
    .with(COLOR.GRAY, () => ({
      backgroundColor: 'bg-gray-100',
      dotColor: 'bg-gray-400',
      textColor: 'text-gray-800'
    }))
    .with(COLOR.GREEN, () => ({
      backgroundColor: 'bg-green-100',
      dotColor: 'bg-green-700',
      textColor: 'text-green-800'
    }))
    .with(COLOR.RED, () => ({
      backgroundColor: 'bg-red-100',
      dotColor: 'bg-red-700',
      textColor: 'text-red-800'
    }))
    .with(COLOR.SLATE, () => ({
      backgroundColor: 'bg-slate-200',
      dotColor: 'bg-slate-700',
      textColor: 'text-slate-900'
    }))
    .exhaustive()

export default function DotTag({ color, text }: DotTagProps) {
  const { backgroundColor, dotColor, textColor } = colorToStyle(color)
  return (
    <div className={`inline-flex rounded-full ${backgroundColor} px-2`}>
      <span className={`dot ${dotColor}`} />
      <span className={textColor}>{text}</span>
    </div>
  )
}
