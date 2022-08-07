import React from 'react'
import { Stepper, Typography, Step, StepLabel } from '@material-ui/core'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import './CheckoutSteps.css'

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ];

    const stepperStyles = {
        boxSizing: 'border-box'
    }

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepperStyles}>
                {steps.map((item, index) => {
                    return (
                        <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                            <StepLabel style={{ color: activeStep >= index ? '#203847' : 'rgba(0,0,0,0.65' }} icon={item.icon}>{item.label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </>
    )
}

export default CheckoutSteps