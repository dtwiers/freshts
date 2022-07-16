import { Action } from '@eezo-state/store';

export type LoadBehavior = 'append' | 'replace';

export type ActionFilter<ActionBaseType extends string, AsyncActionType extends string, FilterMetadata = undefined> = {
  type: ActionBaseType;
  asyncAction: AsyncActionType;
  meta: FilterMetadata;
};

export type WithLoadBehavior = { loadBehavior: LoadBehavior };

export type AsyncStartActionFilter<ActionBaseType extends string, FilterMetadata = undefined> = ActionFilter<
  ActionBaseType,
  'Start',
  FilterMetadata
> &
  WithLoadBehavior;

export type AsyncStartAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = Action<
  AsyncStartActionFilter<ActionBaseType, FilterMetadata>,
  PayloadType
>;

export type AsyncSucceedActionFilter<ActionBaseType extends string, FilterMetadata = undefined> = ActionFilter<
  ActionBaseType,
  'Succeed',
  FilterMetadata
>;
export type AsyncSucceedAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = Action<
  AsyncSucceedActionFilter<ActionBaseType, FilterMetadata>,
  PayloadType
>;

export type AsyncFailAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = Action<
  ActionFilter<ActionBaseType, 'Fail', FilterMetadata>,
  PayloadType
>;

export type AsyncRevertAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = Action<
  ActionFilter<ActionBaseType, 'Revert', FilterMetadata>,
  PayloadType
>;
