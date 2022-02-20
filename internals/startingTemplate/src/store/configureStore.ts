import {
  configureStore,
  getDefaultMiddleware,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';

import { createReducer } from './reducers';
import { rootApi } from 'app/services/api';

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
  });

  return store;
}
