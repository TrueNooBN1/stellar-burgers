import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  clearOrder,
  orderSelector,
  ordersStatusSelector,
  submitOrder
} from './../../services/slices/OrderSlice/OrderSlice';
import {
  clearIngredients,
  constructorIngredientsSelector
} from './../../services/slices/ConstructorSlice/ConstructorSlice';
import { useNavigate } from 'react-router-dom';
import { userAuthenticatedSelector } from './../../services/slices/UserSlice/UserSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const orderRequest = useSelector(ordersStatusSelector);
  const orderModalData = useSelector(orderSelector);
  const constructorItems = useSelector(constructorIngredientsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(userAuthenticatedSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) return navigate('/login');
    const ingredientsId = constructorItems.ingredients.map(
      (value) => value._id
    );
    let orderArray: string[] = [];
    orderArray = orderArray.concat(
      constructorItems.bun._id,
      ingredientsId,
      constructorItems.bun._id
    );
    dispatch(submitOrder(orderArray));
  };
  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
