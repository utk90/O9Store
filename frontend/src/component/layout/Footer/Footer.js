import React from 'react'
import playStore from '../../../images/playstore.png'
import Appstore from '../../../images/Appstore.png'
import './Footer.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download app for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={Appstore} alt="Appstore" />
            </div>
            <div className="midFooter">
                <h1>09STORE</h1>
                <p>Genuine quality is our prime focus</p>
                <p>Copyrights 2022 &copy; 09Store</p>
            </div>
            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="https://www.google.co.in">Instagram</a>
                <a href="https://www.google.co.in">Youtube</a>
                <a href="https://www.google.co.in">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer