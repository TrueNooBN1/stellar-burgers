import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from './../../services/slices/IngredientSlice/IngredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientsData = useSelector(ingredientsSelector);
  const params = useParams<{ id: string }>();
  const ingredientData = ingredientsData.filter(
    (value) => value._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData[0]} />;
};
