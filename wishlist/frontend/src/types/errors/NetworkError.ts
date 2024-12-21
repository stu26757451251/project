import { HttpStatusCode } from 'axios'

export type AppError = NetworkError | UnexpectedError

type NetworkError = {
  _tag: 'NetworkError'
  action: string // TODO:: Here should be specific action
  statusCode: HttpStatusCode | undefined
  message: string
}

export const networkErrorOf =
  (action: string) =>
  (statusCode?: HttpStatusCode) =>
  (message: string): NetworkError => ({
    _tag: 'NetworkError',
    action,
    statusCode,
    message
  })

export const errorShow = (error: AppError): string => {
  return JSON.stringify(error)
}

/*
{
  action: get tasks
  status: 500 ?
  reason: response.message
}
*/

type UnexpectedError = {
  _tag: 'UnexpectedError'
  action: string // TODO:: Here should be specific action
  message: string
}

export const unexpectedErrorOf = (action: string): UnexpectedError => ({
  _tag: 'UnexpectedError',
  action,
  message: 'Unexpected error occurs...'
})
