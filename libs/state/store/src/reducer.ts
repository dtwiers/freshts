import type { ActionReducer } from './store.types';

export const combineReducers = <StateType>(
  ...reducers: ActionReducer<StateType>[]
): ActionReducer<StateType> => {
  return (action) => (state) =>
    reducers.reduce((intermediateState, reducer) => reducer(action)(intermediateState), state);
};
