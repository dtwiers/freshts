import type { Lens } from '@freshts/optics-lens';
import type { NonEmptyArray } from '@freshts/nonempty-array';
import { filter, map, merge, Observable, OperatorFunction } from 'rxjs';
import type { AnyAction } from './action.types';
import type { ActionMatcher } from './matchers.types';
import type { Effect } from './store.types';

export const ofType =
  <ActionType extends AnyAction>(
    ...matchers: NonEmptyArray<ActionMatcher<ActionType>>
  ): OperatorFunction<AnyAction, ActionType> =>
  (source: Observable<AnyAction>) =>
    source.pipe(filter((action: AnyAction): action is ActionType => matchers.some((matcher) => matcher(action))));

export const combineEffects =
  <StateType>(...effects: Effect<StateType>[]): Effect<StateType> =>
  (action$, state$) =>
    merge(...effects.map((effect) => effect(action$, state$)));

export const wrapEffectWithLens =
  <GlobalStateType, InnerStateType>(lens: Lens<GlobalStateType, InnerStateType>) =>
  (effect: Effect<InnerStateType>): Effect<GlobalStateType> =>
  (action$, state$) =>
    effect(action$, state$.pipe(map(lens.get)));
