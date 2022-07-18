import { Action } from '@eezo-state/store';

export type LoadBehavior = 'append' | 'replace';

export type ActionFilter<ActionBaseType extends string, AsyncActionType extends string, FilterMetadata = undefined> = {
  type: ActionBaseType;
  asyncAction: AsyncActionType;
  meta: FilterMetadata;
};

export type WithLoadBehavior = { loadBehavior: LoadBehavior };

export type AsyncStartActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  'Start',
  FilterMetadataType
> &
  WithLoadBehavior;

export type AsyncStartAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncStartActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;

export type AsyncSucceedActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  'Succeed',
  FilterMetadataType
>;
export type AsyncSucceedAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncSucceedActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;

export type AsyncFailActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  'Fail',
  FilterMetadataType
>;
export type AsyncFailAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncFailActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;

export type AsyncRevertActionFilter<ActionBaseType extends string, FilterMetadataType = undefined> = ActionFilter<
  ActionBaseType,
  'Revert',
  FilterMetadataType
>;
export type AsyncRevertAction<ActionBaseType extends string, PayloadType, FilterMetadataType = undefined> = Action<
  AsyncRevertActionFilter<ActionBaseType, FilterMetadataType>,
  PayloadType
>;
