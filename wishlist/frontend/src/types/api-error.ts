import { AxiosError } from 'axios'
import { ZodError, z } from 'zod'
import { NetworkError } from './error/network-error'
import { InvalidResponseFormatError } from './error/invalid-response-format-error'

const ApiErrorSchema = <Code extends string>(codes: readonly [Code, ...Code[]]) =>
  z.object({
    code: z.enum(codes),
    message: z.string(),
    details: z.optional(z.record(z.string(), z.any()))
  })

export type ApiError<Code extends string> = z.infer<ReturnType<typeof ApiErrorSchema<Code>>>

export const handleAxiosError =
  <T>(schema: z.ZodSchema) =>
  (error: AxiosError): NetworkError | InvalidResponseFormatError | T => {
    if (!error.response) {
      return NetworkError.of(error.message)
    }
    try {
      return schema.parse(error.response.data)
    } catch (error) {
      const zodError = error as ZodError
      return InvalidResponseFormatError.of(zodError.message)
    }
  }

const GetTasksErrorCodes = [
  'TASKS_NOT_FOUND',
  'UNAUTHORIZED_ERROR',
  'INTERNAL_SERVER_ERROR'
] as const
export const GetTaskErrorSchema = ApiErrorSchema(GetTasksErrorCodes)
export type GetTaskError =
  | ApiError<(typeof GetTasksErrorCodes)[number]>
  | NetworkError
  | InvalidResponseFormatError
