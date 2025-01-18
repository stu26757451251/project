import { Action } from '../action'

export type NetworkError = {
  code: 'NETWORK_ERROR'
  message: string
}

const of = (message: string): NetworkError => ({
  code: 'NETWORK_ERROR',
  message
})

export const NetworkError = { of }
