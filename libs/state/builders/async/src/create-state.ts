import { FAILURE_STATUS, IDLE_STATUS, LOADING_MORE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from './constants';
import type {
  AsyncFailureState,
  AsyncIdleState,
  AsyncLoadingMoreState,
  AsyncLoadingState,
  AsyncSuccessState,
} from './state.types';

export const createIdleState = <IdleType>(payload: IdleType): AsyncIdleState<IdleType> => ({
  status: IDLE_STATUS,
  payload,
});

export const createLoadingState = <LoadingType>(payload: LoadingType): AsyncLoadingState<LoadingType> => ({
  status: LOADING_STATUS,
  payload,
});

export const createLoadingMoreState = <LoadingMoreType>(
  payload: LoadingMoreType
): AsyncLoadingMoreState<LoadingMoreType> => ({
  status: LOADING_MORE_STATUS,
  payload,
});

export const createSuccessState = <SuccessType>(payload: SuccessType): AsyncSuccessState<SuccessType> => ({
  status: SUCCESS_STATUS,
  payload,
});

export const createFailureState = <PayloadType, FailureType>(
  payload: PayloadType,
  failure: FailureType
): AsyncFailureState<PayloadType, FailureType> => ({
  status: FAILURE_STATUS,
  payload,
  failure,
});
