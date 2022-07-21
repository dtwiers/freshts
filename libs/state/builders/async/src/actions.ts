import { ActionCreator, createActionCreator } from '@eezo-state/store';
import {
  ActionFilter,
  AsyncFailActionFilter,
  AsyncRevertActionFilter,
  AsyncStartAction,
  AsyncStartActionFilter,
  AsyncSucceedActionFilter,
  LoadBehavior,
} from './actions.types';
import { HasBuilderName, HasFilterMetadata, HasLoadBehavior } from './builder.types';
import { START_ACTION_TAG } from './constants';

export const buildAsyncStart = <BuilderNameType extends string, PayloadType, FilterMetadataType = undefined>(
  options: HasBuilderName<BuilderNameType> & Partial<HasFilterMetadata<FilterMetadataType> & HasLoadBehavior>
): ActionCreator<AsyncStartActionFilter<BuilderNameType, FilterMetadataType>, PayloadType> =>
  createActionCreator({
    filter: {
      type: options.builderName,
      asyncAction: START_ACTION_TAG,
      loadBehavior: options.loadBehavior ?? 'replace',
      meta: options.filterMetadata as FilterMetadataType,
    },
    callback: (payload: PayloadType) => payload,
  });

export type MakeAsyncActionBuilder<
  BuilderNameType extends string,
  FilterMetadataType
> = HasBuilderName<BuilderNameType> & Partial<HasFilterMetadata<FilterMetadataType>>;

export const buildAsyncSuccess = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncActionBuilder<ActionKeyType, FilterMetadataType>
): ActionCreator<AsyncSucceedActionFilter<ActionKeyType, FilterMetadataType>, PayloadType> =>
  createActionCreator(
    {
      filter: {
        type: options.builderName,
        asyncAction: 'Succeed',
        meta: options.filterMetadata as FilterMetadataType,
      },
      callback: (payload: PayloadType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );

export const buildAsyncFailure = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncActionBuilder<ActionKeyType, FilterMetadataType>
): ActionCreator<AsyncFailActionFilter<ActionKeyType, FilterMetadataType>, PayloadType> =>
  createActionCreator(
    {
      filter: {
        type: options.builderName,
        asyncAction: 'Fail',
        meta: options.filterMetadata as FilterMetadataType,
      },
      callback: (payload: PayloadType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );

export const buildAsyncRevert = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncActionBuilder<ActionKeyType, FilterMetadataType>
): ActionCreator<AsyncRevertActionFilter<ActionKeyType, FilterMetadataType>, PayloadType> =>
  createActionCreator(
    {
      filter: {
        type: options.builderName,
        asyncAction: 'Revert',
        meta: options.filterMetadata as FilterMetadataType,
      },
      callback: (payload: PayloadType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );
