import { useRef, useState } from "react";
import ProductListing from "../ProductListing";
import './SearchPage.css';

function SearchPage({ className = '' }) {
    const inputRef = useRef();
    const [searchParams, setSearchParams] = useState({});

    function submitHandle(e) {
        e.preventDefault();
        setSearchParams(prev => ({
            ...prev,
            title: inputRef.current.value
        }));
    }

    function inputHandle(e) {
        e.target.value = e.target.value.replaceAll(' ', '');
    }

    return (
        <div className={'SearchPage ' + className}>
            <form className={'SearchPage__form'} onSubmit={submitHandle}>
                <input className={'SearchPage__formInput'} type="text" ref={inputRef} onChange={inputHandle} />
                <button className={'SearchPage__searchButton'}>Search</button>
            </form>
            <ProductListing searchParams={searchParams} />
        </ div>
    )
}

export default SearchPage;