import { useFetch } from 'lib/fetch';
import { redirect } from 'lib/location';
import { useCallback, useEffect, useState } from 'react';

export const useLogin = () => {
  const { fetch, result } = useFetch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const login = useCallback(() => {
    if (username && password) {
      fetch('POST', '/api/collection/user/login', { params: { username, password } });
    }
  }, [username, password]);

  useEffect(() => {
    if (result) {
      if (result?.error) {
        setError(result.error);
      } else {
        redirect('');
      }
    }
  }, [result]);

  return {
    login,
    username,
    setUsername,
    password,
    setPassword,
    error
  };
};
