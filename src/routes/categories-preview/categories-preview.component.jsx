import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.components";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const categorieskeys = Object.keys(categoriesMap);

  return (
    <>
      {categorieskeys.map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
