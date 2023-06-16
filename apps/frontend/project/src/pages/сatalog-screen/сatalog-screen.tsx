import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Layout } from '../../components/layout/layout';
// import { Filters } from '../../components/filters/filters';

function CatalogPage(): JSX.Element {

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="#">Каталог</Link>
            </li>
          </ul>
          <div className="catalog">
          </div>
        </div>
      </main>
    </Layout >
  );
}

export default CatalogPage;
