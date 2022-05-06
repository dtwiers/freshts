import { isOk } from './result';
import { Result } from './types';

export const orElseResult =
  <OkType, FailureType>(alternativeResult: () => Result<OkType, FailureType>) =>
  (input: Result<OkType, FailureType>): Result<OkType, FailureType> => {
    if (isOk(input)) {
      return input;
    }
    return alternativeResult();
  };
