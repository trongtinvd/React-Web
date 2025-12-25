import { useEffect, useRef, useState } from "react";
import ProductListing from "../ProductListing";
import MyLogger from "../../../assets/utils/MyLogger";
import './SearchPage.css';

function SearchPage({ className = '' }) {
    const inputRef = useRef();
    const price_minRef = useRef();
    const price_maxRef = useRef();
    const [searchParams, setSearchParams] = useState({
        title: '',
        price_min: 0,
        price_max: 0,
        categories: [],
    });

    function submitHandle(e) {
        e.preventDefault();
        setSearchParams(prev => ({
            ...prev,
            title: inputRef.current.value,
            price_min: price_minRef.current.value,
            price_max: price_maxRef.current.value,
        }));
    }

    function titleHandle(e) {
        e.target.value = e.target.value.replaceAll(' ', '');
    }

    function price_minHandle(e) {
        price_minRef.current.value = Math.max(0, e.target.value);
        price_maxRef.current.value = Math.max(price_minRef.current.value, price_maxRef.current.value);
    }

    function price_maxHandle(e) {
        price_maxRef.current.value = Math.max(0, e.target.value);
        price_minRef.current.value = Math.min(price_maxRef.current.value, price_minRef.current.value);
    }

    useEffect(() => {
        const controller = new AbortController();
        const log = MyLogger();

        log('/categories fetching');
        fetch('http://localhost:3333/api/categories',
            { signal: controller.signal }
        )
            .then(res => {
                if (!res.ok)
                    throw new Error(`/categories: ${res.status} ${res.statusText}`);
                return res.json();
            })
            .then(categories => {
                log('/categories', categories);
                setSearchParams(prev => ({
                    ...prev,
                    categories,
                }))
            })
            .catch(error => {
                log(`/categories: ${error.message}`);
            })
        return () => {
            log('/categories cleanup');
            controller.abort();
        }
    }, []);

    return (
        <div className={'SearchPage ' + className}>
            <form className={'SearchPage__form'} onSubmit={submitHandle}>
                <label >
                    Product name:
                    <input className={'SearchPage__formInput'} type="text" ref={inputRef} onChange={titleHandle} />
                </label>
                <label >
                    Min price:
                    <input className={'SearchPage__formInput'} type="number" ref={price_minRef} onChange={price_minHandle} />
                </label>
                <label >
                    Max price:
                    <input className={'SearchPage__formInput'} type="number" ref={price_maxRef} onChange={price_maxHandle} />
                </label>
                <label >
                    Category:
                    <select onChange={e => console.log(e.target.value)}>
                        {searchParams.categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <button className={'SearchPage__searchButton'}>Search</button>
            </form>
            <ProductListing searchParams={searchParams} />
        </ div>
    )
}

export default SearchPage;