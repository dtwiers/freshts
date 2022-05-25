import { take } from 'rxjs';
import { AnyAction } from './action.types';
import { createStore } from './store';
import { Effect } from './store.types';

describe('createStore', () => {
  it('creates a store', () => {
    const store = createStore({ initialState: {} });
    expect(store.action$).toBeTruthy();
    expect(store.dispatch).toBeTruthy();
    expect(store.dispose).toBeTruthy();
    expect(store.registerEffect).toBeTruthy();
    expect(store.registerHandler).toBeTruthy();
    expect(store.registerReducer).toBeTruthy();
    expect(store.state).toEqual({});
    expect(store.state$).toBeTruthy();
    expect(store.storeEvent$).toBeTruthy();
  });

  it('starts with the correct state', (done) => {
    const store = createStore({ initialState: {} });
    expect(store.state).toEqual({});
    store.state$.pipe(take(1)).subscribe({
      next: (value) => {
        expect(value).toEqual({});
        done();
      },
    });
  });

  it('logs a reducer registration', (done) => {
    const store = createStore({ initialState: {} });
    store.storeEvent$.pipe(take(1)).subscribe({
      next: (value) => {
        expect(value.message).toBe('store created');
        expect(value.severity).toBe('log');
        done();
      },
    });
  });

  it('registers initial reducers', (done) => {
    const myReducer = (action: AnyAction) => (state: number[]) =>
      action.filter.type === 'foo' ? [...state, state.length] : state;
    const store = createStore({
      initialState: [0],
      reducers: [myReducer],
    });
    store.storeEvent$.pipe(take(1)).subscribe({
      next: (value) => {
        expect(value.severity).toBe('log');
        expect(value.message).toBe('reducer myReducer registered');
        done();
      },
    });
  });

  it('registers effects', (done) => {
    const myEffect: Effect<number[]> = (action$) => action$.pipe();
  });
});
