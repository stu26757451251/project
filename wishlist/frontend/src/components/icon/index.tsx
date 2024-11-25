import Image from 'next/image'
interface IconProps {
  classname?: string
  sizeClassName: string
  src: string
  alt: string
}

export default function Icon({ classname, sizeClassName, src, alt }: IconProps) {
  return (
    <Image className={`${classname} ${sizeClassName}`} src={src} alt={alt} width={0} height={0} />
  )
}
