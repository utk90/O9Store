import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/Product/ProductCard';
import { useParams } from 'react-router-dom';
import './Products.css';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import MetaData from '../layout/MetaData';

const categories = [
    'Laptop',
    "Footwear",
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'Phone'
];

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (n) => {
        setCurrentPage(n);
    }

    const { products, error, loading, productCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

    const { keyword = '' } = useParams();

    const paginationObj = {
        activePage: currentPage,
        itemsCountPerPage: resultPerPage,
        totalItemsCount: productCount,
        onChange: setCurrentPageNo,
        nextPageText: 'Next',
        prevPageText: 'Prev',
        firstPageText: '1st',
        lastPageText: 'Last',
        itemClass: 'page-item',
        linkClass: 'page-link',
        activeClass: 'pageItemActive',
        activeLinkClass: 'pageLinkActive'
    };

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const sliderObj = {
        value: price,
        onChange: priceHandler,
        valueLabelDisplay: 'auto',
        'aria-labelledby': 'range-slider',
        min: 0,
        max: 25000
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, error, alert, category, ratings]);

    const count = filteredProductsCount;

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title='PRODUCTS --- O9STORE' />
                    <h2 className='productsHeading'>Products</h2>
                    <div className="products">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider {...sliderObj} />
                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => (
                                <li className='category-link' key={category} onClick={() => setCategory(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component='legend'>Ratings Above</Typography>
                            <Slider value={ratings} onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                                aria-lablledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                            />
                        </fieldset>
                    </div>
                    {count > resultPerPage ? <div className="paginationBox"><Pagination {...paginationObj} /></div> : null}
                </>
            }
        </>
    )
}

export default Products