import { getTaskList } from '@/services/task'
import { errorShow } from '@/types/errors/NetworkError'
import { Task } from '@/types/task'
import * as tsp from 'ts-pattern'

export default async function MainContent() {
  const data = await getTaskList()
  return (
    <div
      data-testid="content"
      className="h-[] px-60 flex justify-center justify-self-center items-center min-h-[500px] bg-white border rounded-md border-slate-600">
      <span className="place-self-center">
        {/* Here is the editor space for writing down the everyday life. */}
        {tsp
          .match(data)
          .with({ _tag: 'NetworkError' }, { _tag: 'UnexpectedError' }, (error) => {
            return (
              <>
                <div>There is an error occur</div>
                <div>{errorShow(error)}</div>
              </>
            )
          })
          .otherwise((tasks: Array<Task>) =>
            tasks.map((task, index) => <div key={index}>{task.name}</div>)
          )}
      </span>
    </div>
  )
}
