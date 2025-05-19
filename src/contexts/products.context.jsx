import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shop-data.json";

// actual value to pass
export const ProductsContext = createContext({
  products: [],
  // setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS)
  const value = { products }

  useEffect(() => {
    const unsubscribe = () => {}
    return unsubscribe
  }, [])

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}