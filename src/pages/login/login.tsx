import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { loginUser } from './../../services/slices/UserSlice/UserSlice';
import { TLoginData } from '@api';
import { AppDispatch } from 'src/services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginUser(data));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
