import type { BrandedObject } from '@freshts/utility-branded';

export type Ok<T> = BrandedObject<
  {
    ok: T;
  },
  'Ok'
>;

export type Failure<T> = BrandedObject<
  {
    failure: T;
  },
  'Failure'
>;

export type Result<OkType, FailureType> = Ok<OkType> | Failure<FailureType>;
