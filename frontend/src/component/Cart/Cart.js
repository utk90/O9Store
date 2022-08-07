import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import './Cart.css';
import CartItemCard from './CartItemCard.js';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const updatedQty = quantity + 1;
        if (quantity >= stock) {
            return;
        }
        dispatch(addItemsToCart(id, updatedQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const updatedQty = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addItemsToCart(id, updatedQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>No product in you cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) :
                (
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Qunatity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map(item => {
                            return (
                                <div className="cartContainer" keu={item.product}>
                                    <CartItemCard item={item} deleteCarditems={deleteCartItems} />
                                    <div className="cartInput">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                            )
                        })}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{cartItems.reduce((acc, current) => {
                                    acc += current.quantity * current.price;
                                    return acc;

                                }, 0)}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Cart