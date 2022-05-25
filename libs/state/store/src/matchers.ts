import equal from 'fast-deep-equal';
import type { ActionTokenOf, AnyAction } from './action.types';

export const matches =
  <ActionType extends AnyAction>(tokenOrAction: ActionType | ActionTokenOf<ActionType>) =>
  (action: AnyAction): action is ActionType =>
    equal(action.filter, tokenOrAction.filter);

export const matchType =
  <ActionType extends AnyAction>(tokenOrAction: ActionType | ActionTokenOf<ActionType>) =>
  (action: AnyAction): action is ActionType =>
    action.filter.type === tokenOrAction.filter.type;
