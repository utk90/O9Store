import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import './ProductDetails.css'
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (quantity < product.Stock) {
            setQuantity(quantity + 1);
        }
        return;
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
        return;
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success('Item added to cart');
    }

    const submitReviewToggle = () => {
        setOpen(!open);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', id);

        dispatch(newReview(myForm));

        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id));
    }, [dispatch, error, alert, reviewError, success, id]);

    const options = {
        size: 'large',
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={`${product?.name}@O9STORE`} />
                    <div className="ProductDetails">
                        <Carousel>
                            {product.images && product.images.map((item, i) => {
                                return <img className='CarouselImage' src={item.url} key={item.url} alt={`${i} Slide`} />
                            })}
                        </Carousel>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product?.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">{product?.numOfReviews} Reviews</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{product?.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler} disabled={product?.Stock === 0} >Add to Cart</button>
                                </div>
                                <p>
                                    Status: &nbsp;
                                    <b className={product?.Stock === 0 ? 'redColor' : 'greenColor'}>
                                        {product?.Stock === 0 ? 'Out Of Stock' : 'In Stock'}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product?.description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'>REVIEWS</h3>

                    <Dialog aria-labelledby="simple-dialog-title"
                        open={open} onClose={submitReviewToggle}>
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='primary'>Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color='secondary'>Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews.length > 0 ? (
                        <div className='reviews'>
                            {product.reviews.map(review => <ReviewCard review={review} />)}
                        </div>
                    ) : <p className='noReviews'>No Reviews yet</p>}
                </>
            }
        </>
    )
}

export default ProductDetails