import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import {
  ingredientToBottom,
  ingredientToTop,
  deleteIngredient
} from './../../services/slices/ConstructorSlice/ConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = () => {
      dispatch(ingredientToBottom(ingredient._id));
    };

    const handleMoveUp = () => {
      dispatch(ingredientToTop(ingredient._id));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
