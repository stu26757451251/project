import { COLOR } from '@/enum/color'
import { EMERGENCY, FREQUENCY, IMPORTANT } from '@/types/tasks/task'

export const emergencyColorMap: Record<EMERGENCY, COLOR> = {
  [EMERGENCY.EMERGENCY]: COLOR.RED,
  [EMERGENCY.NOT_EMERGENCY]: COLOR.CURIOUS_BLUE
}

export const importantColorMap: Record<IMPORTANT, COLOR> = {
  [IMPORTANT.IMPORTANT]: COLOR.RED,
  [IMPORTANT.NOT_IMPORTANT]: COLOR.CURIOUS_BLUE
}

export const frequencyColorMap: Record<FREQUENCY, COLOR> = {
  [FREQUENCY.DAILY]: COLOR.GRAY,
  [FREQUENCY.WEEKLY]: COLOR.GRAY
}
