import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found-screen.css';

export function NotFoundScreen(): JSX.Element {
  return (
    <div className="not-found-page">
      <main className="not-found-page__main">
        <section className="not-found-page__back">
          <div className="not-found-page__cover-logo">
            <Link className="logo" to={AppRoute.Catalog}>
              <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
            </Link>
          </div>
          <h1 className="not-found-page__title">404. Page not found</h1>
          <a className="form__submit button" href="/">Back to main page</a>
        </section>
      </main>
    </div>
  );
}
