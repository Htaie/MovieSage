import { AuthComponent } from '../../components/Auth';

const RegisterPage = () => {
  return (
    <div>
      <AuthComponent formType='register' setToken={null} />
    </div>
  );
};

export default RegisterPage;
