import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import {
	EMERGENCY,
	FREQUENCY,
	IMPORTANT,
	STATUS,
	Task,
} from "./types/tasks/task"

const server: FastifyInstance = Fastify({})

const taskList: Array<Task> = [
	{
		name: "🪄 Do the dishes",
		description: "Clean the plates hold the pizza yesterday",
		status: STATUS.TODO,
		dueDate: new Date("2025-05-07"),
		priority: 2,
		emergency: EMERGENCY.EMERGENCY,
		important: IMPORTANT.IMPORTANT,
	},
	{
		name: "Go to the gym",
		description: "For everyday life",
		status: STATUS.DONE,
		frequency: FREQUENCY.DAILY,
	},
	{
		name: "Leetcode",
		description: "Read Graph Algortihm, BFS or DFS",
		status: STATUS.IN_PROGRESS,
	},
]

server.get("/tasks", async (request, reply) => {
	return { tasks: taskList }
})

const start = async () => {
	try {
		await server.listen({ port: 3000 })

		const address = server.server.address()
		const port = typeof address === "string" ? address : address?.port
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}

start()
