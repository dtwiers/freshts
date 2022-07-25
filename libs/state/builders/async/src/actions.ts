import { ActionCreator, createActionCreator } from '@freshts/state';
import {
  ActionFilter,
  AsyncFailActionFilter,
  AsyncRevertActionFilter,
  AsyncStartAction,
  AsyncStartActionFilter,
  AsyncSucceedActionFilter,
  LoadBehavior,
} from './actions.types';
import {
  HasBuilderName,
  HasFailureType,
  HasFilterMetadata,
  HasIdleType,
  HasLoadBehavior,
  HasSuccessType,
} from './builder.types';
import { START_ACTION_TAG } from './constants';

export const buildAsyncStart = <BuilderNameType extends string, IdleType, SuccessType, FilterMetadataType = undefined>(
  options: HasBuilderName<BuilderNameType> &
    Partial<HasFilterMetadata<FilterMetadataType> & HasLoadBehavior> &
    HasIdleType<IdleType> &
    HasSuccessType<SuccessType>
): ActionCreator<AsyncStartActionFilter<BuilderNameType, FilterMetadataType>, IdleType | SuccessType> =>
  createActionCreator({
    filter: {
      type: options.builderName,
      asyncAction: START_ACTION_TAG,
      loadBehavior: options.loadBehavior ?? 'replace',
      meta: options.filterMetadata as FilterMetadataType,
    },
    callback: (payload: IdleType | SuccessType) => payload,
  });

export type MakeAsyncActionBuilder<
  BuilderNameType extends string,
  FilterMetadataType
> = HasBuilderName<BuilderNameType> & Partial<HasFilterMetadata<FilterMetadataType>>;

export const buildAsyncSuccess = <ActionKeyType extends string, SuccessType, FilterMetadataType = undefined>(
  options: MakeAsyncActionBuilder<ActionKeyType, FilterMetadataType> & HasSuccessType<SuccessType>
): ActionCreator<AsyncSucceedActionFilter<ActionKeyType, FilterMetadataType>, SuccessType> =>
  createActionCreator(
    {
      filter: {
        type: options.builderName,
        asyncAction: 'Succeed',
        meta: options.filterMetadata as FilterMetadataType,
      },
      callback: (payload: SuccessType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );

export const buildAsyncFailure = <ActionKeyType extends string, FailureType, FilterMetadataType = undefined>(
  options: MakeAsyncActionBuilder<ActionKeyType, FilterMetadataType> & HasFailureType<FailureType>
): ActionCreator<AsyncFailActionFilter<ActionKeyType, FilterMetadataType>, FailureType> =>
  createActionCreator(
    {
      filter: {
        type: options.builderName,
        asyncAction: 'Fail',
        meta: options.filterMetadata as FilterMetadataType,
      },
      callback: (payload: FailureType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );

export const buildAsyncRevert = <
  ActionKeyType extends string,
  IdleType,
  SuccessType,
  FailureType,
  FilterMetadataType = undefined
>(
  options: MakeAsyncActionBuilder<ActionKeyType, FilterMetadataType> &
    HasIdleType<IdleType> &
    HasSuccessType<SuccessType>
): ActionCreator<AsyncRevertActionFilter<ActionKeyType, FilterMetadataType>, IdleType | SuccessType> =>
  createActionCreator(
    {
      filter: {
        type: options.builderName,
        asyncAction: 'Revert',
        meta: options.filterMetadata as FilterMetadataType,
      },
      callback: (payload: IdleType | SuccessType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );
