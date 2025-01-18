export type InvalidResponseFormatError = {
  code: 'INVALID_RESPONSE_FORMAT_ERROR'
  message: string
}

const of = (message: string): InvalidResponseFormatError => ({
  code: 'INVALID_RESPONSE_FORMAT_ERROR',
  message
})

export const InvalidResponseFormatError = { of }
