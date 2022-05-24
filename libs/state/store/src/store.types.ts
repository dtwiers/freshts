import type { Observable, Subscription } from 'rxjs';
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

export type Store<StateType> = {
  action$: Observable<AnyAction>;
  state$: Observable<StateType>;
  state: StateType;
  dispatch: Dispatch;
  registerHandler: (handler: ActionHandler) => void;
  registerEffect: (effect: Effect<StateType>, options?: Partial<RegisterEffectOptions>) => Subscription;
  registerReducer: (reducer: ActionReducer<StateType>) => void;
  storeEvent$: Observable<StoreEvent>;
  dispose: () => void;
};

export type StoreOptions<StateType> = {
  effects?: Effect<StateType>[];
  reducers?: ActionReducer<StateType>[];
  handlers?: ActionHandler[];
  initialState: StateType;
  logDepth?: number; // default 10
};

export type StoreCreator<StateType> = (options: StoreOptions<StateType>) => Store<StateType>;
