import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import { CATEGORY, Todo } from "./types/todo"

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					pong: {
						type: "string",
					},
				},
			},
		},
	},
}

const todoList: Array<Todo> = [
	{
		name: "Do the dishes",
		description: "Clean the plates hold the pizza yesterday",
		category: CATEGORY.CHORE,
	},
	{
		name: "Go to the gym",
		description: "For everyday life",
		category: CATEGORY.EXERCISE,
	},
	{
		name: "Leetcode",
		description: "Read Graph Algortihm, BFS or DFS",
		category: CATEGORY.READING,
	},
]

server.get("/ping", opts, async (request, reply) => {
	return { pong: "pong!" }
})

server.get("/todos", async (request, reply) => {
	return { todos: todoList }
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
