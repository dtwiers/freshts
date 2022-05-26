import equal from 'fast-deep-equal';
import type { ActionOf, ActionTokenOf, AnyAction } from './action.types';
import { ActionMatcher } from './matchers.types';

export const matchesToken =
  <ActionTokenType extends ActionTokenOf<AnyAction>>(
    token: ActionTokenType
  ): ActionMatcher<ActionOf<ActionTokenType>> =>
  (action): action is ActionOf<ActionTokenType> =>
    equal(action.filter, token.filter);
export const matchesAction =
  <ActionType extends AnyAction>(matchingAction: ActionType): ActionMatcher<ActionType> =>
  (action): action is ActionType =>
    equal(action.filter, matchingAction.filter);

export const matchTokenType =
  <ActionTokenType extends ActionTokenOf<AnyAction>>(token: ActionTokenType) =>
  (action: AnyAction): action is ActionOf<ActionTokenType> =>
    action.filter.type === token.filter.type;
export const matchActionType =
  <ActionType extends AnyAction>(matchingAction: ActionType) =>
  (action: AnyAction): action is ActionType =>
    action.filter.type === matchingAction.filter.type;
