import { Routes, Route, Navigate } from "react-router";
import EcommerceLayout from "./EcommerceLayout";
import ProductListing from "./ProductListing";
import SignupPage from "./SignupPage/SignupPage";
import ProductPage from "./ProductPage/ProductPage";
import CreateProductPage from './CreateProductPage/CreateProductPage';
import SearchPage from './SearchPage/SearchPage';

function Ecommerce({ className }) {
    return (
        <Routes>
            <Route element={<EcommerceLayout />} >
                <Route index element={<ProductListing />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route path='create-product' element={<CreateProductPage />} />
                <Route path='product/:productId' element={<ProductPage />} />
                <Route path='*' element={<Navigate to='/ecommerce' />} />
            </Route>
        </Routes>
    );
}

export default Ecommerce;