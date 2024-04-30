import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { supabase } from '../../backend/apiClient/client.js';
import { Route } from '../shared/constants/constants';
import { motion } from 'framer-motion';

import { saveUserDataToLocalStorage, updateUserData } from '../shared/store/UserStore.js';
import { CustomInput } from '../shared/components/CustomInput/CustomInput.js';

export const AuthComponent = ({ formType, setToken }: { formType: string; setToken: any }): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [continueButtonColor, setContinueButtonColor] = useState('white');
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });

  const customStyles = {
    input: {
      backgroundColor: 'black',
      border: '2px solid #2b2c2e',
      borderRadius: '5px',
      color: 'white',
    },
  };

  function handleChange(event: any) {
    setAuthData({ ...authData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (formType === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authData.email,
          password: authData.password,
        });
        if (error) throw error;
        setToken(data);
        saveUserDataToLocalStorage(data);
        updateUserData(data);
        navigate(Route.HOME);
      } else if (formType === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email: authData.email,
          username: authData.username,
          password: authData.password,
          repeatPassword: authData.repeatPassword,
          options: {
            data: {
              username: authData.username,
              avatar: 'https://i.pinimg.com/736x/0a/bf/33/0abf33085bcf7d2f4697a348931f679d.jpg',
            },
          },
        });

        if (error) throw error;
        alert('Check your email for the login link!');
      }
    } catch (error) {
      console.error('Auth error:', error.message);
    }
  };

  const togglePasswordVisibility: React.MouseEventHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsChecked(!isChecked);
    setContinueButtonColor(isChecked ? 'white' : 'green');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div
        className={`text-white border-2  border-solid border-[#5138E9] rounded-lg  w-[500px] h-[${
          formType === 'register' ? '620' : '420'
        }px] border border-[#2b2c2e] rounded-lg`}
      >
        <div className='flex pt-4 ml-[28px] mb-4'>
          <h1 className='text-3xl'>
            Movie<span className='text-[#5138E9]'>Sage</span>
          </h1>
          <button className='w-20 h-12 bg-white text-black border border-[#2b2c2e] rounded-lg ml-[220px]'>Back</button>
        </div>
        {formType === 'register' && (
          <div className='flex justify-center'>
            <CustomInput
              type='text'
              label='Email'
              id='email'
              value={authData.email}
              onChange={handleChange}
              name='email'
            />
          </div>
        )}
        <div className='flex justify-center'>
          <CustomInput
            type='text'
            label={formType === 'register' ? 'Username' : 'Email'}
            id={formType === 'register' ? 'username' : 'email'}
            value={authData[formType === 'register' ? 'username' : 'email']}
            onChange={handleChange}
            name={formType === 'register' ? 'username' : 'email'}
          />
        </div>
        <div className='relative flex justify-center'>
          <CustomInput
            type={showPassword ? 'text' : 'password'}
            label='Password'
            id='password'
            value={authData.password}
            onChange={handleChange}
            name='password'
          />
          <div className='absolute top-0 right-8 m-3 cursor-pointer' onClick={togglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>
        {formType === 'register' && (
          <>
            <div className='relative flex justify-center'>
              <CustomInput
                type={showPassword ? 'text' : 'password'}
                label='Repeat Password'
                id='repeatPassword'
                value={authData.repeatPassword}
                onChange={handleChange}
                name='repeatPassword'
              />
              <div className='absolute top-0 right-8 m-3 cursor-pointer' onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
          </>
        )}
        {formType === 'login' && (
          <>
            <div className='flex justify-center mb-4'>
              <button className='mb-4'>Forgot Password</button>
            </div>
            <div className='flex justify-center '>
              <button onClick={handleSubmit} className='w-[440px] h-12 text-gray-800 bg-white rounded-lg mb-2'>
                Login
              </button>
            </div>
            <div className='flex justify-center mb-2'>
              <p className='text-xs text-gray-400 mr-2 '>Don&apos;t have an account?</p>
              <Link to={'/signup'} className='text-xs'>
                Sign up
              </Link>
            </div>
          </>
        )}
        {formType === 'register' && (
          <>
            <div className='flex justify-center mb-4'>
              <div
                className={`mr-1 rounded-full cursor-pointer ${isChecked ? 'bg-[#5138E9]' : 'bg-black'}`}
                onClick={handleCheckboxChange}
                style={{
                  width: '25px',
                  height: '25px',
                  border: '2px solid gray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isChecked && (
                  <svg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M8.78571 0L3.57143 5.14286L1.21429 2.85714L0 4L3.57143 8L10 1.14286L8.78571 0Z'
                      fill='white'
                    />
                  </svg>
                )}
              </div>
              <p className='text-gray-400 mr-1'>I agree to our</p>
              <button className='mr-1 hover:underline'>Privacy Policy</button>
              <p className='text-gray-400 mr-1'>and</p>
              <button className='hover:underline'>Term & Conditions</button>
            </div>
            <div className='flex justify-center'>
              <Link
                to='/login'
                onClick={handleSubmit}
                className={`w-[440px] h-12 rounded-lg mb-4 inline-flex items-center justify-center ${
                  isChecked ? 'bg-[#5138E9] text-white' : 'bg-white text-gray-800'
                }`}
                style={{ textDecoration: 'none', pointerEvents: isChecked ? 'auto' : 'none' }}
              >
                Continue
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
