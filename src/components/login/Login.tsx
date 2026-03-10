import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/authActions';
import { DEMO_CREDENTIALS } from '../../auth/mockAuthApi';
import { authSelector } from '../../selectors/authSelector';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const dispatch = useDispatch<any>();
  const auth = useSelector(authSelector);
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);

  useEffect(() => {
    if (auth.isAuthenticated) {
      onSuccess();
    }
  }, [auth.isAuthenticated, onSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  const updateEmail = (event: React.FormEvent<HTMLInputElement>) => {
    if (auth.error) {
      dispatch(clearAuthError());
    }

    setEmail(event.currentTarget.value);
  };

  const updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
    if (auth.error) {
      dispatch(clearAuthError());
    }

    setPassword(event.currentTarget.value);
  };

  return (
    <div className="LoginPage">
      <div className="LoginCard">
        <h1>Login</h1>
        <p className="LoginHint">
          Demo credentials: <strong>{DEMO_CREDENTIALS.email}</strong> / <strong>{DEMO_CREDENTIALS.password}</strong>
        </p>
        <form className="LoginForm" onSubmit={handleSubmit}>
          <label className="LoginLabel" htmlFor="email">Email</label>
          <input
            id="email"
            className="LoginInput"
            type="email"
            name="email"
            value={email}
            onChange={updateEmail}
            autoComplete="username"
            disabled={auth.loading}
            required
          />
          <label className="LoginLabel" htmlFor="password">Password</label>
          <input
            id="password"
            className="LoginInput"
            type="password"
            name="password"
            value={password}
            onChange={updatePassword}
            autoComplete="current-password"
            disabled={auth.loading}
            required
          />
          {auth.error ? (
            <div className="LoginError" role="alert">{auth.error}</div>
          ) : undefined}
          <button className="App-load-button LoginButton" type="submit" disabled={auth.loading}>
            {auth.loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
