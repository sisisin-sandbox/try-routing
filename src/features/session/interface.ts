import { createModule } from 'typeless';
import { SessionSymbol } from './symbol';

// --- Actions ---
export const [handle, SessionActions, getSessionState] = createModule(SessionSymbol)
  .withActions({
    $mounted: null,
    loginSucceeded: (user: User) => ({ payload: { user } }),
    logout: null,
  })
  .withState<SessionState>();

// --- Types ---
export interface User {
  name: string;
}
export interface SessionState {
  user: User | undefined;
}
