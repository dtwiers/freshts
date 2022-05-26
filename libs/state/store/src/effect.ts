import { NonEmptyArray } from '@freshts/utility-nonempty-array';
import { filter, OperatorFunction } from 'rxjs';
import { AnyAction } from './action.types';
import type { ActionMatcher } from './matchers.types';

type Foobar = Extract<keyof ['a', 'b'], number>;

export const b: Foobar = 3;

export const ofType =
  <ActionType extends AnyAction>(
    ...matchers: NonEmptyArray<ActionMatcher<ActionType>>
  ): OperatorFunction<AnyAction, ActionType> =>
  (source) =>
    source.pipe(filter((action): action is ActionType => matchers.some((matcher) => matcher(action))));
