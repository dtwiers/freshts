import { Action } from '@eezo-state/store';

export type ActionBehavior = 'append' | 'replace';

export type ActionFilter<
  ActionBaseType extends string,
  Subtype extends string,
  FilterMetadata = undefined
> = FilterMetadata extends undefined
  ? {
      type: ActionBaseType;
      subtype: Subtype;
      behavior?: ActionBehavior;
    }
  : {
      type: ActionBaseType;
      subtype: Subtype;
      behavior?: ActionBehavior;
      meta: FilterMetadata;
    };

export type AsyncAction<
  ActionBaseType extends string,
  Subtype extends string,
  PayloadType,
  FilterMetadata = undefined
> = Action<
  FilterMetadata extends undefined
    ? {
        type: ActionBaseType;
        subtype: Subtype;
        behavior?: ActionBehavior;
      }
    : {
        type: ActionBaseType;
        subtype: Subtype;
        meta: FilterMetadata;
        behavior?: ActionBehavior;
      },
  PayloadType
>;

export type AsyncStartReplaceAction<
  ActionBaseType extends string,
  PayloadType,
  FilterMetadata = undefined
> = AsyncAction<ActionBaseType, 'Start:Replace', PayloadType, FilterMetadata>;

export type AsyncStartAppendAction<
  ActionBaseType extends string,
  PayloadType,
  FilterMetadata = undefined
> = AsyncAction<ActionBaseType, 'Start:Append', PayloadType, FilterMetadata>;

export type AsyncSucceedAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = AsyncAction<
  ActionBaseType,
  'Succeed',
  PayloadType,
  FilterMetadata
>;

export type AsyncFailAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = AsyncAction<
  ActionBaseType,
  'Fail',
  PayloadType,
  FilterMetadata
>;

export type AsyncRevertAction<ActionBaseType extends string, PayloadType, FilterMetadata = undefined> = AsyncAction<
  ActionBaseType,
  'Revert',
  PayloadType,
  FilterMetadata
>;
