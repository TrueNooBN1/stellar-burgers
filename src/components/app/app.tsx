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
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const backgroundLocation = location.state && location.state.background;
  const closeModal = () => {
    // navigate(backgroundLocation || '/');
  };
  // const dispatch = useDispatch();

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />}>
            {/* <Route path=':number' element={<Modal ><OrderInfo/></Modal>}/> */}
          </Route>
          {/* <Route path='/ingredients/:id' element={<Modal><IngredientDetails/></Modal>}/> */}

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
              {/* <Route path=':number' element={<ProtectedRoute onlyUnAuth={false}><Modal><OrderInfo/></Modal></ProtectedRoute>}/> */}
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
