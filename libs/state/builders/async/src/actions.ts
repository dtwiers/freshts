import { createActionCreator } from '@freshts/state-store';

export type MakeAsyncStartOptions<ActionKey extends string, FilterMetadata, PayloadMetadata> = {
  actionKey: ActionKey;
  filterMetadata?: FilterMetadata;
  payloadMetadata?: PayloadMetadata;
};

export const makeAsyncStart = <PayloadType, ActionKey extends string, FilterMetadata = never, PayloadMetadata = never>(
  options: MakeAsyncStartOptions<ActionKey, FilterMetadata, PayloadMetadata>
) =>
  createActionCreator({
    filter: {
      type: options.actionKey,
      metadata: options.filterMetadata,
    },
    callback: (payload: PayloadType) => ({ payload, metadata: options.payloadMetadata }),
  });
