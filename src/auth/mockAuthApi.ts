import { AuthUser } from './session';

export const DEMO_CREDENTIALS = {
  email: 'demo@pubnub.com',
  password: 'password123',
};

const DEMO_USER: AuthUser = {
  email: DEMO_CREDENTIALS.email,
  name: 'Demo User',
  pubnubUserId: 'user-rai-1',
};

const AUTH_DELAY_MS = 800;

export function mockLogin(email: string, password: string): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        resolve(DEMO_USER);
        return;
      }

      reject(new Error('Invalid credentials. Use the demo account listed in the README.'));
    }, AUTH_DELAY_MS);
  });
}
