import { Action } from '../action'

export type UnauthorizedError = {
  code: 'UNAUTHORIZED_ERROR'
  action: Action
  message: string
}

const of =
  (action: Action) =>
  (message: string): UnauthorizedError => ({
    code: 'UNAUTHORIZED_ERROR',
    action,
    message
  })

export const UnauthorizedError = { of }
