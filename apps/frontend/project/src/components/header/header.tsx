import { Link } from 'react-router-dom';
import { MainNavList } from '../main-nav-list/main-nav-list';
import { AppRoute } from '../../const';

export function Header(): JSX.Element {

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Catalog}>
            <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
          </Link>
          <MainNavList/>
          <div className="header__container">
            <span className="header__user-name">Имя</span>
            <Link className="header__link" to={AppRoute.Login} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
