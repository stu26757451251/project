import { AppError, errorShow, networkErrorOf, unexpectedErrorOf } from '@/types/errors/NetworkError'
import { Task } from '@/types/task'
import axios from 'axios'

export const getTaskList: () => Promise<AppError | Array<Task>> = async () => {
  try {
    const tasks = await axios.get<Array<Task>>('/api/tasks').then((response) => response.data)
    return tasks
  } catch (error) {
    // the error could be Axios Error or Unexpected Error
    if (axios.isAxiosError(error) && error.response) {
      const networkError = networkErrorOf('Get task list')(error.status)(error.message)
      console.error(errorShow(networkError))
      return networkError
    } else {
      const unexpectedError = unexpectedErrorOf('Get task list')
      console.error(errorShow(unexpectedError))
      return unexpectedError
    }
  }
}
