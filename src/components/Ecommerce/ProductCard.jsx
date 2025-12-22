import { Link } from 'react-router';
import './ProductCard.css';


function ProductCard({ className, product }) {

    if (!product)
        return null;

    const { id, title, price, images } = product;
    const image = images[0];
    const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(price);

    return (
        <Link to={`/ecommerce/product/${id}`} className={`ProductCard ${className ?? ''}`}>
            <img src={image} alt={title} className='ProductCard__image' />
            <h2 className='ProductCard__title'>{title}</h2>
            <div className='ProductCard__footing'>
                <span className='ProductCard__price'>{formattedPrice}</span>
                <span>★★★★★</span>
            </div>
        </Link>
    );
}

export default ProductCard;