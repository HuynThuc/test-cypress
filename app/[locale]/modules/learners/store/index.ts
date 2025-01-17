import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';
import secureLocalStorage from 'react-secure-storage';

import rootReducer from '@/modules/learners/store/root-reducer';

const isClient = typeof window !== 'undefined';
const secureStorageWrapper = isClient
  ? {
      getItem: (key: string) => {
        const value = secureLocalStorage.getItem(key);
        return Promise.resolve(value);
      },
      setItem: (key: string, value: never) => {
        secureLocalStorage.setItem(key, value);
        return Promise.resolve(value);
      },
      removeItem: (key: string) => {
        secureLocalStorage.removeItem(key);
        return Promise.resolve();
      },
    }
  : {
      getItem: () => Promise.resolve(null),
      setItem: () => Promise.resolve(),
      removeItem: () => Promise.resolve(),
    };
const persistConfig = {
  key: 'root',
  version: 1,
  storage: secureStorageWrapper, // Sử dụng secureLocalStorage thay vì localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
