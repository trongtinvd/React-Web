import { Link } from 'react-router';
import './ProductCard.css';
import { formatPriceVND } from '../../pureFunctions';


function ProductCard({ className, product }) {

    if (!product)
        return null;

    const { id, name, minPrice, image } = product;

    return (
        <Link to={`/ecommerce/product/${id}`} className={`ProductCard ${className ?? ''}`}>
            <img src={image} alt={name} className='ProductCard__image' />
            <h2 className='ProductCard__title'>{name}</h2>
            <div className='ProductCard__footing'>
                <span className='ProductCard__price'>{formatPriceVND(minPrice)}</span>
                <span>★★★★★</span>
            </div>
        </Link>
    );
}

export default ProductCard;