import { Observable, Subscription } from 'rxjs';

export type HasType<T extends string> = {
  type: T;
};

export type Action<Filter extends HasType<string>, Payload> = {
  filter: Filter;
  payload: Payload;
};

export type AnyAction = Action<HasType<string>, unknown>;

export type Dispatch = (action: AnyAction) => void;

export type Effect<StateType> = (
  action$: Observable<AnyAction>,
  state$: Observable<StateType>
) => Observable<AnyAction>;

export type ActionHandler = (action: AnyAction) => void;

export type StateReducer<StateType> = (state: StateType) => StateType;

export type ActionReducer<StateType> = (
  action: AnyAction
) => StateReducer<StateType>;

export type Store<StateType> = {
  action$: Observable<AnyAction>;
  state$: Observable<StateType>;
  state: StateType;
  dispatch: Dispatch;
  registerHandler: (handler: ActionHandler) => void;
  registerEffect: (effect: Effect<StateType>) => Subscription;
  registerReducer: (reducer: ActionReducer<StateType>) => void;
  dispose: () => void;
};

export type StoreOptions<StateType> = {
  effects?: Effect<StateType>[];
  reducers?: ActionReducer<StateType>[];
  handlers?: ActionHandler[];
  initialState: StateType;
};

export type StoreCreator<StateType> = (
  options: StoreOptions<StateType>
) => Store<StateType>;
