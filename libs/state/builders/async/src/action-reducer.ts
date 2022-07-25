import { ActionReducer, combineReducers, matchesToken, on } from '@freshts/state';
import { applyWith, branch, pipe, spread } from '@freshts/compose';
import { buildAsyncFailure, buildAsyncRevert, buildAsyncStart, buildAsyncSuccess } from './actions';
import { HasBuilderName, HasFailureType, HasFilterMetadata, HasIdleType, HasSuccessType } from './builder.types';
import { FAILURE_STATUS, LOADING_MORE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from './constants';
import { AsyncState } from './state.types';

export type ActionReducerBuilder = <
  IdleType,
  SuccessType,
  FailureType,
  BuilderNameType extends string,
  FilterMetadataType = undefined
>(
  builder: HasBuilderName<BuilderNameType> &
    HasIdleType<IdleType> &
    HasSuccessType<SuccessType> &
    HasFailureType<FailureType> &
    Partial<HasFilterMetadata<FilterMetadataType>>
) => ActionReducer<AsyncState<IdleType, SuccessType, FailureType>>;

export const buildLoadActionReducer: ActionReducerBuilder = (builder) =>
  on(
    matchesToken(buildAsyncStart(builder)),
    (action) => () =>
      ({
        status: action.filter.loadBehavior === 'append' ? LOADING_MORE_STATUS : LOADING_STATUS,
        payload: action.payload,
      } as any)
  );

export const buildSuccessActionReducer: ActionReducerBuilder = (builder) =>
  on(
    matchesToken(buildAsyncSuccess(builder)),
    (action) => () =>
      ({
        status: SUCCESS_STATUS,
        payload: action.payload,
      } as any)
  );

export const buildFailureActionReducer: ActionReducerBuilder = (builder) =>
  on(
    matchesToken(buildAsyncFailure(builder)),
    (action) => (state) =>
      ({
        status: FAILURE_STATUS,
        payload: state.payload,
        failure: action.payload,
      } as any)
  );

export const buildRevertActionReducer: ActionReducerBuilder = (builder) =>
  on(
    matchesToken(buildAsyncRevert(builder)),
    (action) => (state) =>
      ({
        ...state,
        payload: action.payload,
      } as any)
  );

export const buildCombinedActionReducer: ActionReducerBuilder = (builder) =>
  combineReducers(
    buildLoadActionReducer(builder),
    buildSuccessActionReducer(builder),
    buildFailureActionReducer(builder),
    buildRevertActionReducer(builder)
  );
