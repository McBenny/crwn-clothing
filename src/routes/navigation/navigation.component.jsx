// Outlet is a placeholder for `<Route />`s nested inside the `<Route />` calling this component
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { signOutUser } from '../../utils/firebase/firebase.utils.js'
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import CartIcon from "../../components/cart-icon/cart-icon.component";
// This imports an svg directly in the source
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartDropdown from "../../components/cart-dropdowm/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch()
  
  const signOutUser = () => dispatch(signOutStart())
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
      <Outlet />
    </>
  );
};

export default Navigation
