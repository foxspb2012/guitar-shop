import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export function MainNavList(): JSX.Element {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <Link className="link main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
        </li>
        <li>
          <Link className="link main-nav__link" to={AppRoute.Root}>Где купить?</Link>
        </li>
        <li>
          <Link className="link main-nav__link" to={AppRoute.Root}>О компании</Link>
        </li>
      </ul>
    </nav>
  );
}
