import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import type { AnyAction } from './action.types';
import {
  attachHandlers,
  calculateState,
  createEventLogger,
  makeDispose,
  makeRegisterEffect,
} from './store.internal.util';
import type { ActionHandler, ActionReducer, Store, StoreEvent, StoreOptions } from './store.types';

export const createStore = <StateType>(options: StoreOptions<StateType>): Store<StateType> => {
  const subscriptions = new Subscription();
  const state$ = options.state$ ?? new BehaviorSubject(options.initialState);
  const action$ = options.action$ ?? new Subject<AnyAction>();
  const storeEvent$ = options.storeEvent$ ?? new ReplaySubject<StoreEvent>(10);

  const postReducerAction$ = new Subject<AnyAction>();
  const reducer$ = new ReplaySubject<ActionReducer<StateType>>(1);
  const handler$ = new ReplaySubject<ActionHandler>();

  const logger = createEventLogger(storeEvent$);

  subscriptions.add(
    calculateState({
      reducer$,
      initialReducers: options.reducers ?? [],
      initialState: options.initialState,
      state$,
      inputAction$: action$,
      outputAction$: postReducerAction$,
      logger,
    })
  );

  subscriptions.add(attachHandlers(handler$, options.handlers ?? [], action$, logger));

  const registerEffect = makeRegisterEffect({
    action$,
    logger,
    postReducerAction$,
    state$,
  });

  (options.effects ?? []).forEach((effect) => {
    subscriptions.add(registerEffect(effect));
  });

  const registerHandler = (handler: ActionHandler): void => {
    handler$.next(handler);
    logger.log(`handler ${handler.name} registered`);
  };

  (options.handlers ?? []).forEach(registerHandler);

  const dispose = makeDispose(
    [
      postReducerAction$,
      reducer$,
      handler$,
      options.state$ && state$,
      options.action$ && action$,
      options.storeEvent$ && storeEvent$,
    ],
    subscriptions,
    logger
  );

  logger.log('store created');
  return {
    state$: state$.asObservable(),
    state: state$.value,
    action$: postReducerAction$.asObservable(),
    dispatch: action$.next.bind(action$),
    registerReducer: (reducer) => {
      reducer$.next(reducer);
      logger.log(`reducer ${reducer.name} registered`);
    },
    registerEffect,
    registerHandler,
    dispose,
    storeEvent$: storeEvent$.asObservable(),
  };
};
