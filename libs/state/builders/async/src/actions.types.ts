import { Action } from '@eezo-state/store';

export type ActionBehavior =
  | 'append'
  | 'replace'

export type AsyncAction<
  ActionBaseType extends string,
  Subtype extends string,
  PayloadType,
  FilterMetadata,
  PayloadMetadata
> = Action<
  {
    type: `${ActionBaseType}:${Subtype}`;
    meta: FilterMetadata;
    behavior?: ActionBehavior;
  },
  {
    data: PayloadType;
    meta: PayloadMetadata;
  }
>;

export type AsyncStartReplaceAction<
  ActionBaseType extends string,
  PayloadType,
  FilterMetadata = void,
  PayloadMetadata = void
> = AsyncAction<ActionBaseType, 'Start:Replace', PayloadType, FilterMetadata, PayloadMetadata>;

export type AsyncStartAppendAction<
  ActionBaseType extends string,
  PayloadType,
  FilterMetadata = void,
  PayloadMetadata = void
> = AsyncAction<ActionBaseType, 'Start:Append', PayloadType, FilterMetadata, PayloadMetadata>;

export type AsyncSucceedAction<
  ActionBaseType extends string,
  PayloadType,
  FilterMetadata = void,
  PayloadMetadata = void
> = AsyncAction<ActionBaseType, 'Succeed', PayloadType, FilterMetadata, PayloadMetadata>;

export type AsyncFailAction<
  ActionBaseType extends string,
  PayloadType,
  FilterMetadata = void,
  PayloadMetadata = void
> = AsyncAction<ActionBaseType, 'Fail', PayloadType, FilterMetadata, PayloadMetadata>;
