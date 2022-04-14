import type { Result, Ok, Failure } from '../types';

export type AsyncOk<T> = Promise<Ok<T>>;
export type AsyncFailure<T> = Promise<Failure<T>>;
export type AsyncResult<OkType, FailureType> = Promise<
  Result<OkType, FailureType>
>;
