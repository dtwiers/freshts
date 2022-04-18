export const isPromise = <T>(input: T | Promise<T>): input is Promise<T> =>
  typeof (input as Promise<T>).then === 'function';
