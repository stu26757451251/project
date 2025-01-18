type DotTagProps = {
  tailwindColor: string
  text: string
  dataTestId: string
}

export default function DotTag({ tailwindColor, text, dataTestId }: DotTagProps) {
  return (
    <div
      data-testid={dataTestId}
      className={`inline-flex rounded-full bg-${tailwindColor}-100 px-2`}>
      <span className={`dot bg-${tailwindColor}-400`} />
      <span className={`text-${tailwindColor}-800`}>{text}</span>
    </div>
  )
}
