import { createActionCreator } from '@eezo-state/store';

export type MakeAsyncStartOptions<ActionKey extends string, FilterMetadata> = {
  actionKey: ActionKey;
  filterMetadata?: FilterMetadata;
};

export const makeAsyncStart = <PayloadType, ActionKey extends string, FilterMetadata = undefined>(
  options: MakeAsyncStartOptions<ActionKey, FilterMetadata>
) =>
  createActionCreator({
    filter: {
      type: options.actionKey,
      metadata: options.filterMetadata,
    },
    callback: (payload: PayloadType) => payload,
  });
