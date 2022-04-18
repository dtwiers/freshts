import { Failure, Ok, Result } from './types';

export const ok = <T>(input: T): Ok<T> => ({
  __type: 'Ok',
  ok: input,
});

export const fail = <T>(input: T): Failure<T> => ({
  __type: 'Failure',
  failure: input,
});

export const isOk = <OkType, FailureType>(
  input: Result<OkType, FailureType>
): input is Ok<OkType> => input.__type === 'Ok';

export const isFailure = <OkType, FailureType>(
  input: Result<OkType, FailureType>
): input is Failure<FailureType> => input.__type === 'Failure';
