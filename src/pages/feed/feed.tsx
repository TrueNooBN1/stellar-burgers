import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from './../../utils/types';
import { FC, useEffect } from 'react';
import {
  feedOrdersSelector,
  getFeed
} from './../../services/slices/FeedSlice/FeedSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(feedOrdersSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
