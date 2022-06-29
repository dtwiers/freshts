import { pipe } from '@freshts/compose';
import { mapOk } from '../map';
import { Result } from '../types';

export const affixToResult =
  <Key extends string>(key: Key) =>
  <OkType, FailureType>(input: Result<OkType, FailureType>): Result<{ [K in Key]: OkType }, FailureType> =>
    pipe(
      input,
      mapOk((value) => ({ [key]: value } as { [K in Key]: OkType }))
    );
