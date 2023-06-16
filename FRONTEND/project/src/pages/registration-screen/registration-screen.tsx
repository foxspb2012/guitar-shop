import { Layout } from '../../components/layout/layout';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-data/selectors';
import { AppRoute } from '../../const';
import RegisterForm from '../../components/register-form/register-form';

export function RegistrationScreen(): JSX.Element {

  const isAuth = useAppSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <RegisterForm />
          </section>
        </div>
      </main>
    </Layout>
  );
}

