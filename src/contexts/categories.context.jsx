import { createContext, useState, useEffect } from "react";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from "../shop-data.js";

// actual value to pass
export const CategoriesContext = createContext({
  categoriesMap: {},
  // setProducts: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap }

  useEffect(() => {
    // To-do once, to upload data in the DB
    // addCollectionAndDocuments('categories', SHOP_DATA)

    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoriesMap)
    }
    getCategoriesMap()
  }, []);

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
}