import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './Search.css';

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHander = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate(`/products`);
        }
    }
    return (
        <div className='search-page'>
            <MetaData title='SEARCH A PRODUCT --- O9STORE' />
            <form className="searchBox" onSubmit={searchSubmitHander}>
                <input type="text" placeholder='Search a product ...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value='Search' />
            </form>
        </div>
    )
}

export default Search