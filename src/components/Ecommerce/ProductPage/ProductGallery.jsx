import { useRef, useState } from 'react';
import Carousel from './Carousel';
import './ProductGallery.css';

function ProductGallery({ className = '', images = [''], smallCarousel = true }) {

    const [index, setIndex] = useState(0)

    // const testImages = [
    //     'https://i.imgur.com/ZKGofuB.jpeg',
    //     'https://i.imgur.com/GJi73H0.jpeg',
    //     'https://i.imgur.com/633Fqrz.jpeg',
    //     'https://i.imgur.com/eGOUveI.jpeg',
    //     'https://i.imgur.com/UcsGO7E.jpeg',
    //     'https://i.imgur.com/NLn4e7S.jpeg',
    //     'https://i.imgur.com/yb9UQKL.jpeg',
    //     'https://i.imgur.com/m2owtQG.jpeg',
    //     'https://i.imgur.com/bNiORct.jpeg'
    // ]

    return (
        <div className={`ProductGallery ${className}`}>
            <Carousel className='ProductGallery__main' images={images} index={index} setIndex={setIndex} />
            <Carousel className='ProductGallery__sub' images={images} index={index} setIndex={setIndex} verticalDirection navDisabled />
        </div>
    );
}

export default ProductGallery;