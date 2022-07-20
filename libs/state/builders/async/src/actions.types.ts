import type { Action } from '@eezo-state/store';
import type { FAIL_ACTION_TAG, REVERT_ACTION_TAG, START_ACTION_TAG, SUCCEED_ACTION_TAG } from './constants';

export type LoadBehavior = 'append' | 'replace';

export type ActionFilter<ActionBaseType extends string, AsyncActionType extends string, FilterMetadata = undefined> = {
  type: ActionBaseType;
  asyncAction: AsyncActionType;
  meta: FilterMetadata;
};

export type WithLoadBehavior = { loadBehavior: LoadBehavior };

export type AsyncStartActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  typeof START_ACTION_TAG,
  FilterMetadataType
> &
  WithLoadBehavior;

export type AsyncStartAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncStartActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;

export type AsyncSucceedActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  typeof SUCCEED_ACTION_TAG,
  FilterMetadataType
>;
export type AsyncSucceedAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncSucceedActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;

export type AsyncFailActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  typeof FAIL_ACTION_TAG,
  FilterMetadataType
>;
export type AsyncFailAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncFailActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;

export type AsyncRevertActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  typeof REVERT_ACTION_TAG,
  FilterMetadataType
>;
export type AsyncRevertAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncRevertActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;
