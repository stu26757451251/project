import { Task } from '@/types/tasks/task'
import { atom } from 'jotai'

export const leftPanelVisibleAtom = atom<boolean>(false)
export const currentTaskAtom = atom<Task | null>(null)
