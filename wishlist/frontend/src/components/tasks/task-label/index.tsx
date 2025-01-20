type TaskLabelProps = {
  title: string
  value?: string
  // should be a key : type of this field
}

export default function TaskLabel({ title, value }: TaskLabelProps) {
  const placeholder = 'Empty'
  return (
    <div className="flex">
      <div className="min-w-32 text-gray-400 font-semibold">{title}</div>
      <div
        suppressContentEditableWarning
        contentEditable="true"
        className={`grow ${value === undefined && 'text-gray-400'}`}>
        {value || placeholder}
      </div>
    </div>
  )
}
