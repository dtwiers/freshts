/* eslint-disable @typescript-eslint/no-explicit-any -- prettier won't let me do single line */
import {
  concat,
  from,
  Observable,
  scan,
  shareReplay,
  Subject,
  Subscription,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import type { AnyAction } from './action.types';
import { combineReducers } from './reducer';
import type { ActionHandler, ActionReducer, Effect, RegisterEffectOptions, StoreEvent } from './store.types';

export type EventLogger = {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
};
export const createEventLogger = (storeEvent$: Subject<StoreEvent>): EventLogger => ({
  log: (message) => storeEvent$.next({ severity: 'log', message }),
  warn: (message) => storeEvent$.next({ severity: 'warn', message }),
  error: (message) => storeEvent$.next({ severity: 'error', message }),
});

type Falsy = false | undefined | null | '' | 0;

export const makeDispose =
  (toComplete: (Subject<any> | Falsy)[], subscription: Subscription, logger: EventLogger) => (): void => {
    // if we log anytime after this, the StoreEvent bus will likely have been completed
    logger.log('store has been disposed');
    toComplete.forEach((maybeSubject) => {
      if (maybeSubject) {
        maybeSubject.complete();
      }
    });
    subscription.unsubscribe();
  };

export const attachHandlers = (
  handler$: Observable<ActionHandler>,
  initialHandlers: ActionHandler[],
  action$: Observable<AnyAction>,
  logger: EventLogger
): Subscription => {
  const allHandler$ = concat(from(initialHandlers ?? []), handler$).pipe(
    scan((arr, handler) => [...arr, handler], [] as ActionHandler[]),
    shareReplay(1)
  );
  initialHandlers.forEach((handler) => logger.log(`handler ${handler.name} registered`));
  return action$
    .pipe(
      withLatestFrom(allHandler$),
      tap(([action, handlers]) => handlers.forEach((handler) => handler(action)))
    )
    .subscribe();
};

export type CalculateStateInput<StateType> = {
  reducer$: Observable<ActionReducer<StateType>>;
  initialReducers: ActionReducer<StateType>[];
  initialState: StateType;
  inputAction$: Observable<AnyAction>;
  outputAction$: Subject<AnyAction>;
  state$: Subject<StateType>;
  logger: EventLogger;
};

export const calculateState = <StateType>(input: CalculateStateInput<StateType>): Subscription => {
  const allReducer$ = concat(from(input.initialReducers), input.reducer$).pipe(
    scan((combined, reducer) => combineReducers(reducer, combined)),
    shareReplay(1)
  );

  (input.initialReducers ?? []).forEach((reducer) => input.logger.log(`reducer ${reducer.name} registered`));

  return allReducer$
    .pipe(
      switchMap((reducer) =>
        input.inputAction$.pipe(scan((state, action) => reducer(action)(state), input.initialState))
      ),
      withLatestFrom(input.inputAction$)
    )
    .subscribe({
      next: ([state, action]) => {
        input.state$.next(state);
        input.outputAction$.next(action);
      },
      complete: () => {
        input.state$.complete();
      },
      error: (err) => {
        input.state$.error(err);
      },
    });
};

export type MakeRegisterEffectInput<StateType> = {
  state$: Observable<StateType>;
  postReducerAction$: Observable<AnyAction>;
  action$: Subject<AnyAction>;
  logger: EventLogger;
};

export const makeRegisterEffect =
  <StateType>(input: MakeRegisterEffectInput<StateType>) =>
  (effect: Effect<StateType>, options?: Partial<RegisterEffectOptions>): Subscription => {
    const subscription = effect(input.postReducerAction$, input.state$).subscribe({
      next: (value) => {
        if (!options?.noDispatch) {
          input.action$.next(value);
        }
      },
      complete: () => input.logger.warn(`effect ${effect.name} has completed.`),
      error: (err) => input.logger.warn(`effect ${effect.name} has errored: ${err}`),
    });
    input.logger.log(`effect ${effect.name} registered`);
    return subscription;
  };
