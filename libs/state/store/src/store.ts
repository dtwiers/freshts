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
import type { AnyAction } from './action.types';
import { combineReducers } from './reducer';
import type { ActionHandler, ActionReducer, Store, StoreEvent, StoreOptions } from './store.types';
import { createEventLogger } from './store.util';

export const createStore = <StateType>(options: StoreOptions<StateType>): Store<StateType> => {
  const subscriptions = new Subscription();
  const state$ = new BehaviorSubject(options.initialState);
  const action$ = new Subject<AnyAction>();
  const postReducerAction$ = new Subject<AnyAction>();
  const reducer$ = new ReplaySubject<ActionReducer<StateType>>(1);
  const handler$ = new ReplaySubject<ActionHandler>();
  const storeEvent$ = new ReplaySubject<StoreEvent>(options.logDepth ?? 10);
  const logger = createEventLogger(storeEvent$);

  const allReducer$ = reducer$.pipe(
    scan((combined, reducer) => combineReducers(reducer, combined)),
    shareReplay(1)
  );

  const stateSubscription = allReducer$
    .pipe(
      switchMap((reducer) => action$.pipe(scan((state, action) => reducer(action)(state), options.initialState))),
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

  logger.log('store created');
  return {
    state$: state$.pipe(),
    state: state$.value,
    action$: action$.pipe(),
    dispatch: action$.next.bind(action$),
    registerReducer: (reducer) => {
      reducer$.next(reducer);
      logger.log(`reducer ${reducer.name} registered`);
    },
    registerEffect: (effect, options) => {
      const subscription = effect(postReducerAction$, state$).subscribe({
        next: (value) => {
          if (!options?.noDispatch) {
            action$.next(value);
          }
        },
        complete: () => logger.warn(`effect ${effect.name} has completed.`),
        error: (err) => logger.warn(`effect ${effect.name} has errored: ${err}`),
      });
      logger.log(`effect ${effect.name} registered`);
      return subscription;
    },
    registerHandler: (handler) => {
      handler$.next(handler);
      logger.log(`handler ${handler.name} registered`);
    },
    dispose: () => {
      state$.complete();
      action$.complete();
      postReducerAction$.complete();
      reducer$.complete();
      handler$.complete();
      logger.log('store has been disposed');
      storeEvent$.complete();
      subscriptions.unsubscribe();
    },
    storeEvent$: storeEvent$.pipe(),
  };
};
