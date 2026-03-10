export const AUTH_STORAGE_KEY = 'demo-react-redux-auth';

export interface AuthUser {
  email: string;
  name: string;
  pubnubUserId: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export function loadAuthState(): AuthState | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (rawValue === null) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (parsed && parsed.isAuthenticated && parsed.user) {
      return {
        ...defaultAuthState,
        isAuthenticated: true,
        user: parsed.user,
      };
    }
  } catch (error) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return undefined;
}

export function persistAuthState(state: AuthState) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!state.isAuthenticated || state.user === null) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    })
  );
}
