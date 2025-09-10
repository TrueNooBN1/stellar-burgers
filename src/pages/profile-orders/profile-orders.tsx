import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  getOrders,
  ordersSelector
} from './../../services/slices/OrderSlice/OrderSlice';
import { AppDispatch } from 'src/services/store/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  console.log('orders', orders);

  return <ProfileOrdersUI orders={orders} />;
};
