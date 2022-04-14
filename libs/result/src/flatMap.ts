import { isFailure, isOk } from './result';
import type { Result } from './types';

export const flatMapOk =
  <OkType, FailureType, OutputOkType>(
    flatMapFn: (input: OkType) => Result<OutputOkType, FailureType>
  ) =>
  (input: Result<OkType, FailureType>): Result<OutputOkType, FailureType> => {
    if (isFailure(input)) {
      return input;
    }
    return flatMapFn(input.ok);
  };

export const flatMapFailure =
  <OkType, FailureType, OutputFailureType>(
    flatMapFn: (input: FailureType) => Result<OkType, OutputFailureType>
  ) =>
  (input: Result<OkType, FailureType>): Result<OkType, OutputFailureType> => {
    if (isOk(input)) {
      return input;
    }
    return flatMapFn(input.failure);
  };
