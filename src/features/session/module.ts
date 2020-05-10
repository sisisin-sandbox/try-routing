import { SessionActions, SessionState, handle } from './interface';
import { appHistory } from '../../appHistory';

const sessKey = 'sess_key';

// --- Epic ---
export const epic = handle
  .epic()
  .on(SessionActions.loginSucceeded, ({ user }) => {
    localStorage.setItem(sessKey, JSON.stringify(user));
    appHistory.push('/');

    return null;
  })
  .on(SessionActions.logout, () => {
    localStorage.removeItem(sessKey);
    appHistory.push('/login');
    return null;
  });

// --- Reducer ---
const initialState: SessionState = {
  user: undefined,
};

export const reducer = handle
  .reducer(initialState)
  .on(SessionActions.$mounted, (state) => {
    const item = localStorage.getItem(sessKey);
    if (item) {
      state.user = JSON.parse(item);
    }
  })
  .on(SessionActions.logout, (state) => {
    state.user = undefined;
  });

// --- Module ---
export const useSessionModule = handle;
