import { Routes, Route, Navigate } from "react-router";
import ProductListing from "./ProductListing";
import SignupPage from "./SignupPage/SignupPage";
import ProductPage from "./ProductPage/ProductPage";
import EcommerceLayout from "./EcommerceLayout";

function Ecommerce({ className }) {
    return (
        <Routes>
            <Route element={<EcommerceLayout />} >
                <Route index element={<ProductListing />} />
                <Route path='signup/' element={<SignupPage />} />
                <Route path='product/:productId' element={<ProductPage />} />
                <Route path='*' element={<Navigate to='/ecommerce' />} />
            </Route>
        </Routes>
    );
}

export default Ecommerce;