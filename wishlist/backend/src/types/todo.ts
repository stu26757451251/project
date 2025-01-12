export enum CATEGORY {
	READING = "reading",
	EXERCISE = "exercise",
	CHORE = "chore",
}

export type Todo = {
	name: string
	description: string
	category: CATEGORY
}
