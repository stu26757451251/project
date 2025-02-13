'use client'
import { ICON } from '@/enum/icon'
import Image from 'next/image'
import { FaClock } from 'react-icons/fa6'
import * as TSP from 'ts-pattern'

interface IconProps {
  className?: string
  icon: ICON
  size?: number
}

export default function Icon({ className, icon, size = 32 }: IconProps) {
  return TSP.match(icon)
    .with(ICON.ARROW_RIGHT, () => (
      <div className={className}>
        <Image src={`/icon/${icon}.svg`} alt={icon} width={size} height={size} />
      </div>
    ))
    .with(ICON.CLOCK, () => <FaClock size="14" className="mr-1 flex-shrink-0" />)
    .exhaustive()
}
