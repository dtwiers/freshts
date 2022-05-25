import type { AnyAction } from './action.types';
import type { ActionReducer } from './store.types';

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
