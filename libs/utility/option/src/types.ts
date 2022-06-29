import { BrandedObject, EmptyBrandedObject } from '@freshts/branded';

export type Some<T> = BrandedObject<
  {
    some: T;
  },
  'Some'
>;

export type None = EmptyBrandedObject<'None'>;

export type Option<T> = Some<T> | None;
