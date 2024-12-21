import { createListenerMiddleware } from '@reduxjs/toolkit';

import { UserState } from './slice/user.slice';
import { AppDispatch, RootState } from './store';

const STORAGE_KEY = 'draft-application';

export const loadAddApplicationState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as UserState;
  } catch {
    return undefined;
  }
};

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

startAppListening({
  predicate: (action, currentState, previousState) => {
    if (action.type === 'add-application/clearAddApplicationState') {
      return false;
    }
    return currentState.userReducer !== previousState.userReducer;
  },
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    const userState = state.userReducer;

    if (userState.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },
});
