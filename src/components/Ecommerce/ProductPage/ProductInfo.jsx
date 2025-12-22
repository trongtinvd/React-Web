import { useState } from 'react';
import Vr from '../../PureComponents/Vr';
import AmountPicker from './AmountPicker';
import './ProductInfo.css';

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

function ProductInfo({ className = '', product }) {
    const { title, price, category } = product;
    const [amount, setAmount] = useState(1);
    return (
        <div className={`ProductInfo ${className}`}>
            <h1 className="ProductInfo__title">{title}</h1>
            <div className='ProductInfo__body'>
                <span className='ProductInfo__body_name'>Category: </span>
                <span className='ProductInfo__body_content'>{category.name}</span>
                <span className='ProductInfo__body_name'>Price: </span>
                <span className='ProductInfo__body_content'>
                    <span className='ProductInfo__truePrice'>{formatPrice(price)}</span>
                    <Vr />
                    <span className='ProductInfo__fakePrice'>{formatPrice(price * 1.4)}</span>
                </span>
                <span className='ProductInfo__body_name'>Amount: </span>
                <AmountPicker className='ProductInfo__body_content' amount={amount} setAmount={setAmount} />
            </div>
            <div className="ProductInfo__buttons">
                <button className="ProductInfo__buttons_buying">Buy</button>
                <button className="ProductInfo__buttons_addToCart">Add to cart</button>
            </div>
        </div>
    )
}

export default ProductInfo;