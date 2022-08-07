import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Product from './Product/ProductCard.js';
import MetaData from '../layout/MetaData';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [alert, dispatch, error])
    return (
        <>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title='O9STORE' />
                    <div className="banner">
                        <p>Welcome to O9STORE</p>
                        <h1>Explore the best of the trends</h1>

                        <a href="#container">
                            <button>
                                Dive In
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Popular Products</h2>

                    <div className="container" id="container">
                        {products && products.map(item => <Product product={item} />)}
                    </div>
                </Fragment>}
        </>
    )
}

export default Home