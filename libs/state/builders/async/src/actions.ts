import { ActionCreator, createActionCreator } from '@eezo-state/store';
import {
  ActionFilter,
  AsyncFailActionFilter,
  AsyncStartAction,
  AsyncStartActionFilter,
  AsyncSucceedActionFilter,
  LoadBehavior,
} from './actions.types';

export type MakeAsyncStartOptions<ActionKeyType extends string, FilterMetadataType> = {
  actionKey: ActionKeyType;
  meta?: FilterMetadataType;
  loadBehavior?: LoadBehavior;
};

export const makeAsyncStart = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncStartOptions<ActionKeyType, FilterMetadataType>
): ActionCreator<AsyncStartActionFilter<ActionKeyType, FilterMetadataType>, PayloadType> =>
  createActionCreator({
    filter: {
      type: options.actionKey,
      asyncAction: 'Start',
      loadBehavior: options.loadBehavior ?? 'replace',
      meta: options.meta as FilterMetadataType,
    },
    callback: (payload: PayloadType) => payload,
  });

export type MakeAsyncActionOptions<ActionKeyType extends string, FilterMetadataType> = {
  actionKey: ActionKeyType;
  meta?: FilterMetadataType;
};
export const makeAsyncSuccess = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncActionOptions<ActionKeyType, FilterMetadataType>
): ActionCreator<AsyncSucceedActionFilter<ActionKeyType, FilterMetadataType>, PayloadType> =>
  createActionCreator(
    {
      filter: {
        type: options.actionKey,
        asyncAction: 'Succeed',
        meta: options.meta as FilterMetadataType,
      },
      callback: (payload: PayloadType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );

export const makeAsyncFailure = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncActionOptions<ActionKeyType, FilterMetadataType>
): ActionCreator<AsyncFailActionFilter<ActionKeyType, FilterMetadataType>, PayloadType> =>
  createActionCreator(
    {
      filter: {
        type: options.actionKey,
        asyncAction: 'Fail',
        meta: options.meta as FilterMetadataType,
      },
      callback: (payload: PayloadType) => payload,
    },
    (action) => `${action.filter.type}:${action.filter.asyncAction}`
  );
