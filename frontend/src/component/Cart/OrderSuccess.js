import { Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import './OrderSuccess.css';

const OrderSuccess = () => {
    return (
        <div className='orderSuccess'>
            <CheckCircleIcon />
            <Typography>Your order has been placed successfully</Typography>
            <Link to='/orders'>View Orders</Link>
        </div>
    )
}

export default OrderSuccess