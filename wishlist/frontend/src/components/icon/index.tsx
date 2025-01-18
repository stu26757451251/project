import { ICON } from '@/enum/icon'
import Image from 'next/image'
interface IconProps {
  classname?: string
  sizeClassName: string
  type: ICON
}

export default function Icon({ classname, sizeClassName, type }: IconProps) {
  return (
    <Image
      className={`${classname} ${sizeClassName}`}
      src={`/icon/${type}.svg`}
      alt={type}
      width={0}
      height={0}
    />
  )
}
