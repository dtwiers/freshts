import type { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import type { AnyAction } from './action.types';

export type Dispatch = (action: AnyAction) => void;

export type Effect<StateType> = (
  action$: Observable<AnyAction>,
  state$: Observable<StateType>
) => Observable<AnyAction>;

export type ActionHandler = (action: AnyAction) => void;

export type StateReducer<StateType> = (state: StateType) => StateType;

export type ActionReducer<StateType, ActionType extends AnyAction = AnyAction> = (
  action: ActionType
) => StateReducer<StateType>;

export type RegisterEffectOptions = {
  noDispatch: boolean;
};

export type StoreEventSeverity = 'log' | 'warn' | 'error';

export type StoreEvent = {
  severity: StoreEventSeverity;
  message: string;
};

/**
 * FreshTS Store. The Result of a `createStore()` call.
 */
export type Store<StateType> = {
  /**
   * An observable of actions, dispatched after reducers are finished pushing new state.
   */
  action$: Observable<AnyAction>;

  /**
   * An observable of state. This is a BehaviorSubject behind the scenes, so `state$` is guaranteed
   * emit the current state synchronously upon subscription.
   */
  state$: Observable<StateType>;

  /**
   * An observable of StoreEvents to track "ancillary" events that may happen in a store's lifetime
   * - registering additional reducers, effects, etc.
   */
  storeEvent$: Observable<StoreEvent>;

  /**
   * A mutable property that when read is a way to get current state$ synchronously. This is useful
   * to avoid a double-render in React and similar libraries. For the bulk of your state needs, you
   * should use `state$`.
   */
  state: StateType;

  /**
   * The primary way of pushing data to the store. This is very similar to the Redux dispatch function.
   */
  dispatch: Dispatch;

  /**
   * For functions that need to know of a particular action dispatched but don't need the state and
   * don't need to update anything - you can register a handler.
   *
   * @param handler The ActionHandler to register
   * @returns void
   */
  registerHandler: (handler: ActionHandler) => void;

  registerEffect: (effect: Effect<StateType>, options?: Partial<RegisterEffectOptions>) => Subscription;
  registerReducer: (reducer: ActionReducer<StateType>) => void;
  dispose: () => void;
};

export type StoreOptions<StateType> = {
  effects?: Effect<StateType>[];
  reducers?: ActionReducer<StateType>[];
  handlers?: ActionHandler[];
  initialState: StateType;
  storeEvent$?: Subject<StoreEvent>;
  action$?: Subject<AnyAction>;
  state$?: BehaviorSubject<StateType>;
};

export type StoreCreator<StateType> = (options: StoreOptions<StateType>) => Store<StateType>;
