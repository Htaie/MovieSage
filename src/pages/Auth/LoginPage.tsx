import { AuthComponent } from '../../components/Auth';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [authToken, setAuthToken] = useState(false);

  if (authToken) {
    localStorage.setItem('authToken', JSON.stringify(authToken));
  }
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      let data = JSON.parse(localStorage.getItem('authToken') as string);
      setAuthToken(data);
    }
  }, []);
  return (
    <div>
      <AuthComponent formType='login' setToken={setAuthToken} />
    </div>
  );
};

export default LoginPage;
