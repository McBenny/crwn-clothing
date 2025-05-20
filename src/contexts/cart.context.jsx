import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
  }

  // let productFound = false
  // const updatedCartItems = cartItems.map((cartItem) => {
  //   if (cartItem.id === productToAdd.id) {
  //     cartItem.quantity += 1
  //     productFound = true
  //   }
  // })
  // if (productFound) {
  //   return updatedCartItems
  // }
  return [
    ...cartItems,
    {...productToAdd, quantity: 1}
  ]
}

// actual value to pass
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cardCount: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => cartItem.quantity + total,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems])
  
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}