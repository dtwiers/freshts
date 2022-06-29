import { NonEmptyArray } from '@freshts/nonempty-array';
import { filter, Observable } from 'rxjs';
import { AnyAction } from './action.types';
import type { ActionMatcher } from './matchers.types';

export const ofType =
  <ActionType extends AnyAction>(...matchers: NonEmptyArray<ActionMatcher<ActionType>>) =>
  (source: Observable<AnyAction>) =>
    source.pipe(filter((action): action is ActionType => matchers.some((matcher) => matcher(action))));
