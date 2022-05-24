import {
  BehaviorSubject,
  ReplaySubject,
  scan,
  shareReplay,
  Subject,
  Subscription,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { combineReducers } from './reducer';
import {
  ActionHandler,
  ActionReducer,
  AnyAction,
  Store,
  StoreOptions,
} from './store.types';

export const createStore = <StateType>(
  options: StoreOptions<StateType>
): Store<StateType> => {
  const subscriptions = new Subscription();
  const state$ = new BehaviorSubject(options.initialState);
  const action$ = new Subject<AnyAction>();
  const postReducerAction$ = new Subject<AnyAction>();
  const reducer$ = new ReplaySubject<ActionReducer<StateType>>(1);
  const handler$ = new ReplaySubject<ActionHandler>();

  const allReducer$ = reducer$.pipe(
    scan((combined, reducer) => combineReducers(reducer, combined)),
    shareReplay(1)
  );

  const stateSubscription = allReducer$
    .pipe(
      switchMap((reducer) =>
        action$.pipe(
          scan((state, action) => reducer(action)(state), options.initialState)
        )
      ),
      withLatestFrom(action$)
    )
    .subscribe({
      next: ([state, action]) => {
        state$.next(state);
        postReducerAction$.next(action);
      },
      complete: () => {
        state$.complete();
      },
      error: (err) => {
        state$.error(err);
      },
    });
  subscriptions.add(stateSubscription);

  return {
    state$: state$.pipe(),
    state: state$.value,
    action$: action$.pipe(),
    dispatch: action$.next,
    registerReducer: reducer$.next,
    registerEffect: (effect) =>
      effect(postReducerAction$, state$).subscribe(action$),
    registerHandler: handler$.next,
    dispose: () => {
      state$.complete();
      action$.complete();
      postReducerAction$.complete();
      reducer$.complete();
      handler$.complete();
    },
  };
};
