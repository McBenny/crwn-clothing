import { AnyAction } from 'redux-saga';
import { CartItem } from './cart.types'
import { setCartItems, setIsCartOpen } from './cart.action';

export type CartState = {
  readonly isCartOpen: boolean
  readonly cartItems: CartItem[]
  readonly cartCount: number
  readonly cartTotal: number
};

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [] as CartItem[],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  const { payload } = action;
  
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: payload,
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: payload,
    };
  }
  return state
};