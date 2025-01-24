import { COLOR } from '@/enum/color'
import { ICON } from '@/enum/icon'
import { EMERGENCY, FREQUENCY, IMPORTANT } from '@/types/tasks/task'

export const emergencyColorMap: Record<EMERGENCY, COLOR> = {
  [EMERGENCY.EMERGENCY]: COLOR.RED,
  [EMERGENCY.NOT_EMERGENCY]: COLOR.CURIOUS_BLUE
}

export const importantColorMap: Record<IMPORTANT, COLOR> = {
  [IMPORTANT.IMPORTANT]: COLOR.CINNABAR,
  [IMPORTANT.NOT_IMPORTANT]: COLOR.CURIOUS_BLUE
}

export const frequencyColorMap: Record<FREQUENCY, COLOR> = {
  [FREQUENCY.DAILY]: COLOR.GRAY,
  [FREQUENCY.WEEKLY]: COLOR.GRAY
}

export const frequencyIconMap: Record<FREQUENCY, ICON> = {
  [FREQUENCY.DAILY]: ICON.CLOCK,
  [FREQUENCY.WEEKLY]: ICON.CLOCK
}
