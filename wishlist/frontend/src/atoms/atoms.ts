import { Task } from '@/types/tasks/task'
import { atom } from 'jotai'

export const TASK_PANEL_MIN_WIDTH = 500

export const leftPanelVisibleAtom = atom<boolean>(false)
export const currentTaskAtom = atom<Task | null>(null)
export const taskPanelWidthAtom = atom<number>(TASK_PANEL_MIN_WIDTH)
export const isResizingAtom = atom<boolean>(false)
