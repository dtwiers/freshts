import type { AnyAction } from './action.types';

export type ActionMatcher<ActionType extends AnyAction> = (action: AnyAction) => action is ActionType;
