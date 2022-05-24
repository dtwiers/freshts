import { take } from 'rxjs';
import { createStore } from './store';

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
});
