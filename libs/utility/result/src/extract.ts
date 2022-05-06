import { isOk } from './result';
import type { Result } from './types';

export const extractResult =
  <OkType, FailureType, OutputType>(
    onOk: (input: OkType) => OutputType,
    onFailure: (input: FailureType) => OutputType
  ) =>
  (input: Result<OkType, FailureType>): OutputType => {
    if (isOk(input)) {
      return onOk(input.ok);
    }
    return onFailure(input.failure);
  };
