import ColorTag from '@/components/tag/color-tag'
import { COLOR } from '@/enum/color'
import { formatDate } from '@/utils/date'
import * as TSP from 'ts-pattern'

export enum FIELD_TYPE {
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  COLOR_TAG = 'TAG',
  STRING = 'STRING'
}

type NumberField = {
  type: FIELD_TYPE.NUMBER
  title: string
  value: number
}

type StringField = {
  type: FIELD_TYPE.STRING
  title: string
  value: string
}

type DateField = {
  type: FIELD_TYPE.DATE
  title: string
  value: Date
}

type ColorTagField<E extends string> = {
  type: FIELD_TYPE.COLOR_TAG
  title: string
  color: COLOR
  value: E
}

type TaskLabelProps<E extends string> = NumberField | StringField | DateField | ColorTagField<E>

export default function TaskLabel<E extends string>(props: TaskLabelProps<E>) {
  const placeholder = 'Empty'

  const textComponent = TSP.match(props)
    .with({ type: FIELD_TYPE.DATE }, ({ value }) => (
      <div
        suppressContentEditableWarning
        contentEditable="true"
        className={`grow ${value === undefined && 'text-gray-400'}`}>
        {formatDate(value) || placeholder}
      </div>
    ))
    .with({ type: FIELD_TYPE.NUMBER }, { type: FIELD_TYPE.STRING }, ({ value }) => (
      <div
        suppressContentEditableWarning
        contentEditable="true"
        className={`grow ${value === undefined && 'text-gray-400'}`}>
        {value || placeholder}
      </div>
    ))
    .with({ type: FIELD_TYPE.COLOR_TAG }, ({ color, value }) => (
      <ColorTag color={color} text={value} />
    ))
    .exhaustive()
  return (
    <div className="flex">
      <div className="min-w-32 text-gray-400 font-semibold">{props.title}</div>
      {textComponent}
    </div>
  )
}
