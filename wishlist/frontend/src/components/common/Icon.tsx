import { ICON } from '@/enum/icon'
import * as TSP from 'ts-pattern'
import { ChevronsRight, Clock } from 'lucide-react'

interface IconProps {
  className?: string
  icon: ICON
  size?: number
}

export default function Icon({ className, icon, size = 14 }: IconProps) {
  return TSP.match(icon)
    .with(ICON.ARROW_RIGHT, () => <ChevronsRight className={className} size={size} />)
    .with(ICON.CLOCK, () => <Clock className={className} size={size} />)
    .exhaustive()
}
