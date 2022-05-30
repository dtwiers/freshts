import { Action } from '@freshts/state-store';

// TODO: Come up with a better type param name than ActionTypeType. That sounds stupid.
export type AsyncAction<ActionTypeType extends string, PayloadType> = Action<{ type: ActionTypeType }, PayloadType>;
