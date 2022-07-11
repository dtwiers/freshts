import { ActionCreator, createActionCreator } from '@eezo-state/store';
import { AsyncStartAppendAction } from './actions.types';

export type MakeAsyncStartOptions<ActionKey extends string, FilterMetadata> = {
  actionKey: ActionKey;
  filterMetadata?: FilterMetadata;
};

export const makeAsyncStartAppend = <PayloadType, ActionKey extends string, FilterMetadata = undefined>(
  options: MakeAsyncStartOptions<ActionKey, FilterMetadata>
): ActionCreator<, PayloadType> =>
  createActionCreator({
    filter: {
      type: options.actionKey,
      subtype: 'Start:Append',
      metadata: options.filterMetadata,
    },
    callback: (payload: PayloadType) => payload,
  });
