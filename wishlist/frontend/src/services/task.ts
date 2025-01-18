import { GetTaskError, GetTaskErrorSchema, handleAxiosError } from '@/types/api-error'
import { Task } from '@/types/tasks/task'
import axios, { AxiosError } from 'axios'
import * as TE from 'fp-ts/TaskEither'

type GetTasksResponse = {
  tasks: Array<Task>
}

export const getTasks: TE.TaskEither<GetTaskError, GetTasksResponse> = TE.tryCatch(
  // validate the response matching
  () => axios.get<GetTasksResponse>(`/tasks`).then((response) => response.data),
  (error) => handleAxiosError<GetTaskError>(GetTaskErrorSchema)(error as AxiosError)
)
