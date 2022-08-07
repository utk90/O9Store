import { Typography } from '@material-ui/core'
import React from 'react'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='notfound-page'><Typography className='not-found-text' component={'h1'}>404 Not Found</Typography></div>
    )
}

export default NotFound