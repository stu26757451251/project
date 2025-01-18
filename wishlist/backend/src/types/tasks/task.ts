import { z } from "zod"

export enum STATUS {
	TODO = "todo",
	IN_PROGRESS = "in_progress",
	WAITING = "waiting",
	DONE = "done",
}

export enum EMERGENCY {
	EMERGENCY = "EMERGENCY",
	NOT_EMERGENCY = "NOT_EMERGENCY",
}

export enum IMPORTANT {
	IMPORTANT = "IMPORTANT",
	NOT_IMPORTANT = "NOT_IMPORTANT",
}

export enum FREQUENCY {
	DAILY = "DAILY",
	WEEKLY = "WEEKLY",
}

const Name = z.string()
type Name = z.infer<typeof Name>

const Description = z.string()
type Description = z.infer<typeof Description>

const Status = z.nativeEnum(STATUS)
type Status = z.infer<typeof Status>

const DueDate = z.date()
type DueDate = z.infer<typeof DueDate>

const Priority = z.number().int().positive()
type Priority = z.infer<typeof Priority>

const Emergency = z.nativeEnum(EMERGENCY)
type Emergency = z.infer<typeof Emergency>

const Frequency = z.nativeEnum(FREQUENCY)
type Frequency = z.infer<typeof Frequency>

const Important = z.nativeEnum(IMPORTANT)
type Important = z.infer<typeof Important>

const Task = z.object({
	name: Name,
	description: Description,
	status: Status,
	dueDate: z.optional(DueDate),
	priority: z.optional(Priority),
	frequency: z.optional(Frequency),
	emergency: z.optional(Emergency),
	important: z.optional(Important),
})

export type Task = z.infer<typeof Task>

/*

const Status = {
  OPEN:'OPEN',
  CLOSED: 'CLOSED'
} as const

type Status = typeof Status[keyof typeof Status]

*/
