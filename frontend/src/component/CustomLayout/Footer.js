import './Footer.css';
import Logo from '../../images/logo.jpg'

const Footer = () => {
    const backToTopHandler = () => {
        window.scrollTo(0, 0);
    }
    return (
        <footer className='layout-footer'>
            <img src={Logo} alt='O9Store' />
            <p>Copyright &copy; 2022</p>
            <button className='footer-btn' onClick={() => backToTopHandler()}>Back To Top</button>
        </footer>
    );
}

export default Footer;