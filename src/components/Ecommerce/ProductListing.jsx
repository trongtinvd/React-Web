import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import './ProductListing.css'
const apiUrl = import.meta.env.VITE_APP_API_URL;

function ProductListing({ className = '' }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        fetch(`${apiUrl}/products`, { signal: controller.signal })
            .then(res => {
                if (!res.ok)
                    throw new Error(`/products error: ${res.status} ${res.statusText}`)
                return res.json()
            })
            .then(res => {
                setProducts(res);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log('error:', err);
            })
        return () => {
            controller.abort('fetch canceled')
        };
    }, [])

    return (
        <div className={'ProductListing ' + className}>
            {
                loading ? <div className={'ProductListing__loading ' + className}>Loading...</div>
                    :
                    <div className="ProductListing__container">
                        {products.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
            }
        </div>
    );
}

export default ProductListing;