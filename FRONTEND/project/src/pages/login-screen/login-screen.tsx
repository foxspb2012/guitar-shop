import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Layout } from '../../components/layout/layout';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-data/selectors';
import { login } from '../../store/api-actions';

export function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  if (isAuth) {
    return <Navigate to={AppRoute.Catalog}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(login({email, password}));
  };

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">
              Hовый&nbsp;пользователь?
              <Link className="login__link" to={AppRoute.Registration}>
                Зарегистрируйтесь
              </Link>
              прямо&nbsp;сейчас
            </p>
            <form method="post" action="#" onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input type="email" id="email" name="email" autoComplete="off" value={email}
                  onChange={(evt) => setEmail(evt.target.value)} required
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label>
                <span>
                  <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                    required
                  />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Войти</button>
            </form>
          </section>
        </div>
      </main>
    </Layout>
  );
}

