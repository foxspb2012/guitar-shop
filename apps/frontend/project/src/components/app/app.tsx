import { useEffect } from 'react';
import { AppRoute } from '../../const';
import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login-screen/login-screen';
import { RegistrationScreen } from '../../pages/registration-screen/registration-screen';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { useAppDispatch } from '../../hooks/';
import { checkAuth } from '../../store/api-actions';
import { CatalogScreen } from '../../pages/сatalog-screen/сatalog-screen';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<LoginScreen/>}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginScreen/>}
      />
      <Route
        path={AppRoute.Registration}
        element={<RegistrationScreen/>}
      />
      <Route
        path={AppRoute.Catalog}
        element={
          <PrivateRoute>
            <CatalogScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
