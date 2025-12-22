import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import Header from "../Header/Header";
import './ProductPage.css';
const apiUrl = import.meta.env.VITE_APP_API_URL;

function ProductPage({ className = '' }) {

    const { productId } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`${apiUrl}/products/${productId}`, { signal })
            .then(res => {
                if (!res.ok) throw new Error(`Error: ${res.status}`)
                return res.json();
            })
            .then(res => {
                setProduct(res);
                setLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError')
                    return;
            });
        return () => {
            controller.abort('fetching product info was canceled');
        }
    }, [productId]);

    if (loading) {
        return <span>loading...</span>;
    }

    if (!product) {
        return <span>unable to fetch product id = {productId} info</span>;
    }

    return (
        <div className="ProductPage__wrapper">
            <div className={`ProductPage ${className}`}>
                <ProductGallery className='ProductPage__images' images={product.images} />
                <ProductInfo className='ProductPage__body' product={product} />
                <div className='ProductPage__description'>{product.description}</div>
            </div>
        </div>
    );
}

export default ProductPage;