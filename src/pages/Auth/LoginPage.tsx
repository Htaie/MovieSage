import { AuthComponent } from '../../components/Auth';
import { useEffect, useState } from 'react';

import { supabase } from '../../../backend/apiClient/client';

const LoginPage = () => {
  const [authToken, setAuthToken] = useState(false);

  return (
    <div>
      <button className='text-white absolute bottom-24' onClick={() => testing()}>
        TEST
      </button>
      <AuthComponent formType='login' setToken={setAuthToken} />
    </div>
  );
};

export default LoginPage;
