import { Action } from '../action'

export type InternalServerError = {
  code: 'INTERNAL_SERVER_ERROR'
  action: Action
  message: string
}

const of =
  (action: Action) =>
  (message: string): InternalServerError => ({
    code: 'INTERNAL_SERVER_ERROR',
    action,
    message
  })

export const InternalServerError = { of }
