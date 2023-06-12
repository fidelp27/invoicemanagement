import AsideContainer from './AsideContainer';
import { Link } from 'react-router-dom';
const MenuAside = ({ handleShowAside, isAsideOpen }) => {
  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <ul className="menu-options">
        <Link to="form">Create Invoice</Link>
        <Link to="list">Invoices List</Link>
      </ul>
    </AsideContainer>
  );
};
export default MenuAside;
