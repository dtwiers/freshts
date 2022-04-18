import { isOk, ok } from './result';
import { Failure, Result } from './types';

export const applyWith =
  <Param, FailureType>(wrappedParam: Result<Param, FailureType>) =>
  <OutputOkType>(
    wrappedFn: Result<(param: Param) => OutputOkType, FailureType>
  ): Result<OutputOkType, FailureType> => {
    if (isOk(wrappedFn) && isOk(wrappedParam)) {
      return ok(wrappedFn.ok(wrappedParam.ok));
    }
    if (isOk(wrappedParam)) {
      return wrappedFn as Failure<FailureType>;
    }

    return wrappedParam;
  };
