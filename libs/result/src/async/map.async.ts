import { isFailure, isOk } from '../result';
import { Result } from '../types';
import { asyncFail, asyncOk } from './result.async';
import { AsyncResult } from './types';

export const mapOkAsync =
  <OkType, FailureType, OutputOkType>(
    mapFn: (input: OkType) => OutputOkType | Promise<OutputOkType>
  ) =>
  async (
    input: Result<OkType, FailureType> | AsyncResult<OkType, FailureType>
  ): AsyncResult<OutputOkType, FailureType> => {
    const result = await input;
    if (isFailure(result)) {
      return result;
    }
    return asyncOk(mapFn(result.ok));
  };

export const mapFailureAsync =
  <OkType, FailureType, OutputFailureType>(
    mapFn: (
      input: FailureType
    ) => OutputFailureType | Promise<OutputFailureType>
  ) =>
  async (
    input: Result<OkType, FailureType> | AsyncResult<OkType, FailureType>
  ): AsyncResult<OkType, OutputFailureType> => {
    const result = await input;
    if (isOk(result)) {
      return result;
    }
    return asyncFail(mapFn(result.failure));
  };
