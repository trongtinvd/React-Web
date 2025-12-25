import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import MyLogger from "../../assets/utils/MyLogger";
import './ProductListing.css'
const apiUrl = import.meta.env.VITE_APP_API_URL;

function ProductListing({ className = '', searchParams }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const log = MyLogger();
        const controller = new AbortController();
        const params = new URLSearchParams(searchParams);
        log('/products fetching');
        fetch(`${apiUrl}/products?${params}`, { 
            signal: controller.signal,
         })
            .then(res => {
                if (!res.ok)
                    throw new Error(`/products error: ${res.status} ${res.statusText}`)
                return res.json()
            })
            .then(products => {
                log('/products', products)
                setProducts(products.slice(0, 25));
                setLoading(false);
            })
            .catch(err => {
                log('error:', err);
            })
        return () => {
            log('/products cleanup');
            setLoading(true);
            controller.abort(`/product fetch canceled ${JSON.stringify(searchParams)}`);
        };
    }, [searchParams])

    let body;
    if (loading)
        body = <div className={'ProductListing__loading ' + className}>Loading...</div>;
    else if (products.length === 0)
        body = <div>Nothing were found...</div>;
    else
        body = (
            <div className="ProductListing__container">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        );

    return (
        <div className={'ProductListing ' + className}>
            {body}
        </div>
    );
}

export default ProductListing;