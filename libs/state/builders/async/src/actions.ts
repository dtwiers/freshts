import { ActionCreator, createActionCreator } from '@eezo-state/store';
import {
  ActionFilter,
  AsyncStartAction,
  AsyncStartActionFilter,
  AsyncSucceedActionFilter,
  LoadBehavior,
} from './actions.types';

export type MakeAsyncStartOptions<ActionKeyType extends string, FilterMetadataType> = {
  actionKey: ActionKeyType;
  meta?: FilterMetadataType;
  loadBehavior?: LoadBehavior;
} & (FilterMetadataType extends unknown ? {} : { meta: FilterMetadataType });

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

export type MakeAsyncSuccessOptions<ActionKeyType extends string, FilterMetadataType> = {
  actionKey: ActionKeyType;
  meta?: FilterMetadataType;
};
export const makeAsyncSuccess = <ActionKeyType extends string, PayloadType, FilterMetadataType = undefined>(
  options: MakeAsyncSuccessOptions<ActionKeyType, FilterMetadataType>
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
    // TODO: clear up meta tostring logic
    (action) => `${action.filter.type}:${action.filter.asyncAction}:${action.filter.meta}`
  );
