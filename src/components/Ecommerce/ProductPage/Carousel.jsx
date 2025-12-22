import { useState, useEffect, useRef } from "react";
import './Carousel.css';

function Carousel({
    className = '',
    index,
    setIndex,
    images = [''],
    itemGap = 0.5,
    width = 10,
    height = 10,
    navDisabled = false,
    verticalDirection = false,
}) {
    const containerRef = useRef();

    function scrollLeftHandle() {
        const newIndex = Math.max(0, index - 1)
        setIndex(newIndex);
    }

    function scrollRightHandle() {
        const newIndex = Math.min(images.length - 1, index + 1)
        setIndex(newIndex);
    }

    function imageClickHandle(index) {
        setIndex(index);
    }

    useEffect(() => {
        const items = containerRef.current.children;
        items[index]?.scrollIntoView({
            behavior: "smooth",
            inline: verticalDirection ? "nearest" : "center",
            block: verticalDirection ? "center" : "nearest"
        });
    }, [index, verticalDirection])

    const containerStyle = {
        '--Carousel-containerGap': `${itemGap}rem`,
        '--Carousel-scroll': verticalDirection ? 'y' : 'x',
        '--Carousel-direction': verticalDirection ? 'column' : 'row',
        '--Carousel-containerWidth': `${width}rem`,
        '--Carousel-containerHeight': `${height}rem`,
    }

    return (
        <div className='Carousel'>
            <div ref={containerRef} className={`Carousel__container Carousel__containerStyling ${className}`} style={containerStyle}>
                {images.map((image, i) => <img loading="lazy" key={i} onClick={() => imageClickHandle(i)} className={`Carousel__item ${i === index && 'Carousel__hightlighted'}`} src={image} alt={`image #${i + 1}`} />)}
            </div>
            {navDisabled || index <= 0 || <button className="Carousel__navLeftButton" onClick={scrollLeftHandle}>{'<'}</button>}
            {navDisabled || index >= images.length - 1 || <button className="Carousel__navRightButton" onClick={scrollRightHandle}>{'>'}</button>}
        </div>
    );
}

export default Carousel;