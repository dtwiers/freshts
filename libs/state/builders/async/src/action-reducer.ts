import type { ActionReducer } from '@eezo-state/store';
import { HasBuilderName, HasFilterMetadata } from './builder.types';
import { AsyncState } from './state.types';

export const buildLoadActionReducer =
  <IdleType, SuccessType, FailureType, BuilderNameType extends string, FilterMetadataType = undefined>(
    builder: HasBuilderName<BuilderNameType> & Partial<HasFilterMetadata<FilterMetadataType>>
  ): ActionReducer<AsyncState<IdleType, SuccessType, FailureType>> =>
  (action) =>
  (state) =>
    state;
