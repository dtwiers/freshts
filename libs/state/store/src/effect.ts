import { filter, map, Observable, OperatorFunction } from 'rxjs';
import { createActionCreator } from './action';
import type { AnyAction } from './action.types';
import { matches } from './matchers';
import type { ActionMatcher } from './matchers.types';

type MatchersOf<ActionTypes extends AnyAction[]> = {
  // TODO: This looks wrong.
  [K in keyof ActionTypes]: K extends number ? ActionMatcher<ActionTypes[K]> : never;
};

export const ofType =
  <ActionTypes extends AnyAction[]>(
    ...matchers: MatchersOf<ActionTypes>
  ): OperatorFunction<AnyAction, ActionTypes[number]> =>
  (source) =>
    source.pipe(
      filter<AnyAction, ActionTypes[number]>((action): action is ActionTypes[number] =>
        matchers.some((matcher) => matcher(action))
      )
    );

declare const foo$: Observable<AnyAction>;

// TODO: this type is a mess and doesn't work. Fix it so it whittles down the types appropriately.
foo$.pipe(
  ofType(matches(createActionCreator({ filter: { type: 'foo' }, callback: (num: number) => num }))),
  map((action) => action)
);
