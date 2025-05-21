// Outlet is a placeholder for `<Route />`s nested inside the `<Route />` calling this component
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from '../../utils/firebase/firebase.utils.js'
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context.jsx";
import CartIcon from "../../components/cart-icon/cart-icon.component.jsx";
// This imports an svg directly in the source
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from "./navigation.styles.jsx";
import CartDropdown from "../../components/cart-dropdowm/cart-dropdown.component.jsx";

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)
  
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign-out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign-in</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      {/* <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>Sign-out</span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign-in
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div> */}
      <Outlet />
    </>
  );
};

export default Navigation
