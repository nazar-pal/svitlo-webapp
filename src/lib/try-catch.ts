type Success<T> = [null, T]
type Failure<TError> = [TError, null]
type Result<T, TError> = Success<T> | Failure<TError>

function formatError<TError = Error>(error: unknown): TError {
  if (error instanceof Error) return error as TError
  if (typeof error === 'string') return new Error(error) as TError
  if (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  )
    return new Error(error.message) as TError
  return new Error('Unknown error') as TError
}

/**
 * Safely execute a synchronous function and return a result tuple.
 * @example const [error, data] = tryCatch(() => JSON.parse(raw))
 */
export function tryCatch<T, TError = Error>(fn: () => T): Result<T, TError> {
  try {
    return [null, fn()]
  } catch (error) {
    return [formatError<TError>(error), null]
  }
}

/**
 * Safely await a promise and return a result tuple.
 * @example const [error, data] = await asyncTryCatch(fetch('/api'))
 */
export async function asyncTryCatch<T, TError = Error>(
  promise: Promise<T>
): Promise<Result<T, TError>> {
  try {
    return [null, await promise]
  } catch (error) {
    return [formatError<TError>(error), null]
  }
}
