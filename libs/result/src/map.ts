import { fail, isFailure, isOk, ok } from './result';
import { Result } from './types';

export const mapOk =
  <OkType, FailureType, OutputOkType>(mapFn: (input: OkType) => OutputOkType) =>
  (input: Result<OkType, FailureType>): Result<OutputOkType, FailureType> => {
    if (isFailure(input)) {
      return input;
    }
    return ok(mapFn(input.ok));
  };

export const mapFailure =
  <OkType, FailureType, OutputFailureType>(
    mapFn: (input: FailureType) => OutputFailureType
  ) =>
  (input: Result<OkType, FailureType>): Result<OkType, OutputFailureType> => {
    if (isOk(input)) {
      return input;
    }
    return fail(mapFn(input.failure));
  };
