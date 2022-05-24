import type { AnyAction, ActionTokenOf } from './action.types';
import type { ActionReducer } from './store.types';
import equal from 'fast-deep-equal';

export const combineReducers = <StateType>(...reducers: ActionReducer<StateType>[]): ActionReducer<StateType> => {
  return (action) => (state) =>
    reducers.reduce((intermediateState, reducer) => reducer(action)(intermediateState), state);
};

const reducerNoOp = <StateType>(state: StateType): StateType => state;

export const on = <StateType, ActionType extends AnyAction>(
  matcher: (action: AnyAction) => action is ActionType,
  reducer: ActionReducer<StateType, ActionType>
): ActionReducer<StateType> => {
  return (action) => {
    if (matcher(action)) {
      return reducer(action);
    }
    return reducerNoOp;
  };
};

export const matches =
  <ActionType extends AnyAction>(tokenOrAction: ActionType | ActionTokenOf<ActionType>) =>
  (action: AnyAction): action is ActionType =>
    equal(action.filter, tokenOrAction.filter);
