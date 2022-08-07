import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import './Navbar.css';

const Navbar = (e) => {
    const [activeId, setActiveId] = useState(-1);
    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());
        alert.success('Logged out successfully!!');
        navigate('/');
    }

    const handleTabSwitch = useCallback((id) => {
        const navEl = document?.querySelectorAll('.navbar-link');
        const homeTabEl = document?.querySelector('.navbar-home');
        const productTabEl = document?.querySelector('.navbar-product');
        const contactTabEl = document?.querySelector('.navbar-contact');
        const aboutTabEl = document?.querySelector('.navbar-about');
        const searchTabEl = document?.querySelector('.navbar-search');
        // const loginTabEl = document?.querySelector('.navbar-login');
        // const logoutTabEl = document?.querySelector('.navbar-logout');

        if (navEl) {
            navEl.forEach(item => {
                item.style.border = 'none'
            })
        }

        switch (id) {
            case 0:
                if (homeTabEl) {
                    homeTabEl.style.borderBottom = '2px solid white';
                }
                break;
            case 1:
                if (navEl && productTabEl) {
                    productTabEl.style.borderBottom = '2px solid white';
                }
                break;
            case 2:
                if (contactTabEl) {
                    contactTabEl.style.borderBottom = '2px solid white';
                }
                break;
            case 3:
                if (aboutTabEl) {
                    aboutTabEl.style.borderBottom = '2px solid white';
                }
                break;
            case 4:
                if (searchTabEl) {
                    searchTabEl.style.borderBottom = '2px solid white';
                }
                break;
            case 6:
                if (homeTabEl) {
                    homeTabEl.style.borderBottom = '2px solid white';
                }
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        handleTabSwitch(activeId);
    }, [activeId, handleTabSwitch])
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-link-container'>
                    <Link to='/' className='navbar-link navbar-home' onClick={() => setActiveId(0)}>Home</Link>
                    <Link to='/products' className='navbar-link navbar-product' onClick={() => setActiveId(1)}>Product</Link>
                    {/* <Link to='/contact' className='navbar-link navbar-contact' onClick={() => setActiveId(2)}>Contact</Link>
                    <Link to='/about' className='navbar-link navbar-about' onClick={() => setActiveId(3)}>About</Link > */}
                    <Link to='/search' className='navbar-link navbar-search' onClick={() => setActiveId(4)}>Search</Link >
                    {
                        isAuthenticated ?
                            <Link to='/' className='navbar-link navbar-logout' onClick={() => {
                                setActiveId(6);
                                logoutUser();
                            }}>Logout</Link >
                            :
                            <Link to='/login' className='navbar-link navbar-login' onClick={() => setActiveId(5)}>Login</Link >
                    }
                </div >
            </nav >
        </>
    );
}

export default Navbar;