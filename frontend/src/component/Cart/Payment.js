import React, { useEffect, useRef } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps/CheckoutSteps';
import { Typography } from '@material-ui/core';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';
import './Payment.css';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const { error } = useSelector(state => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100) //to paise
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const { data } = await axios.post('/api/v1/process/payment', paymentData, config)

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const { address, city, state, pincode, country } = shippingInfo;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: address,
                            city: city,
                            state: state,
                            postal_code: pincode,
                            country: country
                        }
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order));

                    navigate('/success');
                } else {
                    alert.error(`There's some issue while processing payment`);
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [alert, dispatch, error])

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className="paymentFormBtn" />
                </form>
            </div>
        </>
    )
}

export default Payment