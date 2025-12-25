import { useState } from 'react';
import Vr from '../../PureComponents/Vr';
import AmountPicker from './AmountPicker';
import VariationPicker from './VariationPicker';
import { formatPriceVND } from '../../../pureFunctions.js';
import './ProductInfo.css';



function ProductInfo({ className = '', product }) {
    const { name, category, variations, variationNames } = product;
    const [selectedValues, setSelectedValues] = useState([]);
    const [price, setPrice] = useState(product.minPrice);
    const [amount, setAmount] = useState(1);

    return (
        <div className={`ProductInfo ${className}`}>
            <h1 className="ProductInfo__title">{name}</h1>
            <div className='ProductInfo__body'>
                <span className='ProductInfo__body_name'>Category: </span>
                <span className='ProductInfo__body_content'>{category.name}</span>
                <span className='ProductInfo__body_name'>Price: </span>
                <span className='ProductInfo__body_content'>
                    <span className='ProductInfo__truePrice'>{formatPriceVND(price)}</span>
                    <span> | </span>
                    <span className='ProductInfo__fakePrice'>{formatPriceVND(price * 1.4)}</span>
                </span>
                <span className='ProductInfo__body_name'>Amount: </span>
                <AmountPicker className='ProductInfo__body_content' amount={amount} setAmount={setAmount} />
            </div>
            <VariationPicker setPrice={setPrice} selectedValues={selectedValues} setSelectedValues={setSelectedValues} variations={variations} variationNames={variationNames} />
            <div className="ProductInfo__buttons">
                <button className="ProductInfo__buttons_buying">Buy</button>
                <button className="ProductInfo__buttons_addToCart">Add to cart</button>
            </div>
        </div>
    )
}

export default ProductInfo;