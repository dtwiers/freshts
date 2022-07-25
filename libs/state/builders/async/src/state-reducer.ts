import type { StateReducer } from '@freshts/state';
import { FAILURE_STATUS, IDLE_STATUS, LOADING_MORE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from './constants';
import type { AsyncState } from './state.types';

export const createInitStateReducer =
  <PayloadType>(payload: PayloadType): StateReducer<AsyncState<PayloadType, never, never>> =>
  () => ({
    status: IDLE_STATUS,
    payload,
  });

export const createSuccessStateReducer =
  <PayloadType>(payload: PayloadType): StateReducer<AsyncState<never, PayloadType, never>> =>
  () => ({
    status: SUCCESS_STATUS,
    payload,
  });

export const createLoadingStateReducer =
  <IdleType, SuccessType>(payload: IdleType | SuccessType): StateReducer<AsyncState<IdleType, SuccessType, never>> =>
  () => ({
    status: LOADING_STATUS,
    payload,
  });

export const createLoadingMoreStateReducer =
  <SuccessType>(payload: SuccessType): StateReducer<AsyncState<never, SuccessType, never>> =>
  () => ({
    status: LOADING_MORE_STATUS,
    payload,
  });

export const createFailureStateReducer =
  <IdleType, SuccessType, FailureType>(
    failure: FailureType
  ): StateReducer<AsyncState<IdleType, SuccessType, FailureType>> =>
  (state) => ({
    ...state,
    status: FAILURE_STATUS,
    failure,
  });
