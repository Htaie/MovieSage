import { AuthComponent } from '../../components/Auth';
import { useState } from 'react';
const LoginPage = () => {
  const [authToken, setAuthToken] = useState(false);

  return (
    <>
      <AuthComponent formType='login' setToken={setAuthToken} />
    </>
  );
};

export default LoginPage;
