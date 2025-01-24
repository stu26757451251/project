import { ICON } from '@/enum/icon'
import Image from 'next/image'
import { FaClock } from 'react-icons/fa6'
import * as TSP from 'ts-pattern'

interface IconProps {
  classname?: string
  icon: ICON
}

export default function Icon({ classname, icon }: IconProps) {
  return TSP.match(icon)
    .with(ICON.ARROW_RIGHT, () => (
      <Image className={`${classname}`} src={`/icon/${icon}.svg`} alt={icon} width={0} height={0} />
    ))
    .with(ICON.CLOCK, () => <FaClock size="14" className="mr-1 flex-shrink-0" />)
    .exhaustive()
}
