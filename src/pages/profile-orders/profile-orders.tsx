import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrders,
  ordersSelector
} from './../../services/slices/OrderSlice/OrderSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  console.log('orders', orders);

  return <ProfileOrdersUI orders={orders} />;
};
