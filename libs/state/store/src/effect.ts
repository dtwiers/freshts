import { NonEmptyArray } from '@freshts/utility-nonempty-array';
import { filter, OperatorFunction } from 'rxjs';
import { AnyAction } from './action.types';
import type { ActionMatcher } from './matchers.types';

export const ofType =
  <ActionType extends AnyAction>(
    ...matchers: NonEmptyArray<ActionMatcher<ActionType>>
  ): OperatorFunction<AnyAction, ActionType> =>
  (source) =>
    source.pipe(filter((action): action is ActionType => matchers.some((matcher) => matcher(action))));
