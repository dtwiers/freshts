import { mapOk } from '../map';
import { flatMapOk } from '../flat-map';
import { ok } from '../result';
import { Ok, Result } from '../types';
import { pipe } from '@freshts/compose';

export const buildResult: Ok<Record<string, never>> = ok({});

export const adjoinToResult =
  <InputOkType, NewOkType, Key extends string, FailureType>(
    key: Exclude<Key, keyof InputOkType>,
    newValue: Result<NewOkType, FailureType>
  ) =>
  (
    input: Result<InputOkType, FailureType>
  ): Result<
    { [K in Key | keyof InputOkType]: K extends keyof InputOkType ? InputOkType[K] : NewOkType },
    FailureType
  > =>
    pipe(
      input,
      flatMapOk((unwrappedInput) =>
        pipe(
          newValue,
          mapOk(
            (unwrappedNewValue) =>
              ({ ...unwrappedInput, [key]: unwrappedNewValue } as {
                [K in Key | keyof InputOkType]: K extends keyof InputOkType ? InputOkType[K] : NewOkType;
              })
          )
        )
      )
    );

export const flatMapAndAdjoin =
  <InputOkType, NewOkType, Key extends string, FailureType>(
    key: Exclude<Key, keyof InputOkType>,
    flatMapFn: (input: InputOkType) => Result<NewOkType, FailureType>
  ) =>
  (
    input: Result<InputOkType, FailureType>
  ): Result<
    { [K in Key | keyof InputOkType]: K extends keyof InputOkType ? InputOkType[K] : NewOkType },
    FailureType
  > =>
    pipe(
      input,
      flatMapOk((unwrappedInput) =>
        pipe(
          flatMapFn(unwrappedInput),
          mapOk(
            (flatMapResult) =>
              ({ ...unwrappedInput, [key]: flatMapResult } as {
                [K in Key | keyof InputOkType]: K extends keyof InputOkType ? InputOkType[K] : NewOkType;
              })
          )
        )
      )
    );
