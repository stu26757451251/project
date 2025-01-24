import Fastify, { FastifyInstance } from "fastify"
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
	{
		name: "Practice English Reading",
		description:
			"For Singapore trip, I should practice reading and speaking ability.",
		priority: 3,
		status: STATUS.TODO,
		frequency: FREQUENCY.WEEKLY,
		important: IMPORTANT.IMPORTANT,
	},
	{
		name: "Receive The Mail From Mom",
		description:
			"Last month back home, mom said that she will send the fruit to department",
		status: STATUS.WAITING,
		emergency: EMERGENCY.NOT_EMERGENCY,
		important: IMPORTANT.IMPORTANT,
	},
	{
		name: "Travel to Clark",
		description: "Go to Clark with my friends in 2025",
		dueDate: new Date("2025-12-31"),
		status: STATUS.TODO,
		important: IMPORTANT.IMPORTANT,
	},
]

server.get("/tasks", async () => {
	return { tasks: taskList }
})

const start = async () => {
	try {
		await server.listen({ port: 3000 })
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}

start()
