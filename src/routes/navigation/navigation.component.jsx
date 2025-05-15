// Outlet is a placeholder for `<Route />`s nested inside the `<Route />` calling this component
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss'

// This imports an svg directly in the source
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/sign-in">
            Sign in
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation
