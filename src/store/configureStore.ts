import {
  configureStore,
  getDefaultMiddleware,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
  StoreEnhancer,
} from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';
import { rootApi } from 'app/services/api';
import { createInjectorsEnhancer } from 'redux-injectors';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

    if (isRejectedWithValue(action)) {
      // Throw any error
    }

    return next(action);
  };

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      rtkQueryErrorLogger,
      ...getDefaultMiddleware().concat(rootApi.middleware),
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  return store;
}
