interface TitleProps {
  title: string
}
export default function Title({ title }: TitleProps) {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <span>{title}</span>
    </div>
  )
}
