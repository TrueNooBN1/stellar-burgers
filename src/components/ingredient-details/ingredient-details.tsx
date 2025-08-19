import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from './../../services/store';
import { ingredientsSelector } from './../../services/slices/IngredientSlice/IngredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientsData = useSelector(ingredientsSelector);
  const params = useParams<{ id: string }>();

  if (!ingredientsData) {
    return <Preloader />;
  }

  const ingredientData = ingredientsData.find(
    (value) => value._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
