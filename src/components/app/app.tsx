import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredient } from './../../services/slices/IngredientSlice/IngredientSlice';
import { AppDispatch } from 'src/services/store';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;
  const closeModal = () => {
    navigate(backgroundLocation || '/');
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIngredient());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute onlyUnAuth={false}>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path=':number'
              element={
                <ProtectedRoute onlyUnAuth={false}>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* modalRoutes */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/orders/:number'
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Modal title='Заказ' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ингредиент' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Заказ' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
