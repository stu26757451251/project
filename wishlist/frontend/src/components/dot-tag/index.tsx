import { COLOR } from '@/enum/color'
import * as TSP from 'ts-pattern'

type DotTagProps = {
  tailwindColor: COLOR
  text: string
  dataTestId: string
}

const colorVariants = (
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
    .otherwise(() => ({
      backgroundColor: '',
      dotColor: '',
      textColor: ''
    }))

export default function DotTag({ tailwindColor, text, dataTestId }: DotTagProps) {
  const { backgroundColor, dotColor, textColor } = colorVariants(tailwindColor)
  return (
    <div data-testid={dataTestId} className={`inline-flex rounded-full ${backgroundColor} px-2`}>
      <span className={`dot ${dotColor}`} />
      <span className={textColor}>{text}</span>
    </div>
  )
}
