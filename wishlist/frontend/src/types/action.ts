import { z } from 'zod'

enum ACTION {
  GET_TASKS = 'GET_TASKS'
}

const Action = z.nativeEnum(ACTION)
export type Action = z.infer<typeof Action>
