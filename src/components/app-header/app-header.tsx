import { FC } from 'react';
import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store/store';
import { userDataSelector } from './../../services/slices/UserSlice/UserSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);
  return <AppHeaderUI userName={user ? `${user.name}` : ''} />;
};
