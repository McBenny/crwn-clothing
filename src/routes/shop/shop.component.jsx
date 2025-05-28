import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCategories } from '../../store/categories/category.action'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // To-do once, to upload data in the DB
    // addCollectionAndDocuments('categories', SHOP_DATA)

    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories')      
      dispatch(setCategories(categoriesArray))
    }
    getCategoriesMap()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
}

export default Shop
