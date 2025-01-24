import ColorTag from '@/components/tag/color-tag'
import IconTag from '@/components/tag/icon-tag'
import { COLOR } from '@/enum/color'
import { ICON } from '@/enum/icon'
import { formatDate } from '@/utils/date'
import { useState } from 'react'
import * as TSP from 'ts-pattern'

export enum FIELD_TYPE {
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  COLOR_TAG = 'COLOR_TAG',
  STRING = 'STRING',
  ICON_TAG = 'ICON_TAG'
}

type NumberField = {
  type: FIELD_TYPE.NUMBER
  title: string
  value: number | undefined
}

type StringField = {
  type: FIELD_TYPE.STRING
  title: string
  value: string | undefined
}

type DateField = {
  type: FIELD_TYPE.DATE
  title: string
  value: Date | undefined
}

type ColorTagField<E extends string> = {
  type: FIELD_TYPE.COLOR_TAG
  title: string
  color: Record<E, COLOR>
  value: E | undefined
}

type IconTagField<E extends string> = {
  type: FIELD_TYPE.ICON_TAG
  title: string
  color: Record<E, COLOR>
  icon: Record<E, ICON>
  value: E | undefined
}

type TaskFieldProps<E extends string> =
  | NumberField
  | StringField
  | DateField
  | ColorTagField<E>
  | IconTagField<E>

export default function TaskField<E extends string>(props: TaskFieldProps<E>) {
  const [input, setInput] = useState<string>('')
  const placeholder = 'Empty'

  const emptyField = TSP.match(props.type)
    .with(FIELD_TYPE.STRING, FIELD_TYPE.NUMBER, () => (
      <div
        suppressContentEditableWarning
        contentEditable="true"
        className={'grow text-gray-400'}
        onInput={(e) => console.log(e.currentTarget.textContent)}>
        {placeholder}
      </div>
    ))
    .with(FIELD_TYPE.DATE, () => <></>)
    .with(FIELD_TYPE.COLOR_TAG, () => <></>)
    .with(FIELD_TYPE.ICON_TAG, () => <></>)
    .exhaustive()

  // TODO: Time span concern
  const renderContentField = TSP.match(props)
    .with({ type: FIELD_TYPE.DATE }, ({ value }) => (
      <div suppressContentEditableWarning contentEditable="true" className={`grow`}>
        {formatDate(value!)}
      </div>
    ))
    .with({ type: FIELD_TYPE.NUMBER }, { type: FIELD_TYPE.STRING }, ({ value }) => (
      <div suppressContentEditableWarning contentEditable="true" className={`grow`}>
        {value!}
      </div>
    ))
    .with({ type: FIELD_TYPE.COLOR_TAG }, ({ color, value }) => (
      <ColorTag color={color[value!]} text={value!} />
    ))
    .with({ type: FIELD_TYPE.ICON_TAG }, ({ color, icon, value }) => (
      <IconTag icon={icon[value!]} color={color[value!]} text={value!} />
    ))
    .exhaustive()

  return (
    <div className="flex min-h-[26px]">
      <div className="min-w-32 text-gray-400 font-semibold">{props.title}</div>
      {props.value ? renderContentField : emptyField}
    </div>
  )
}
