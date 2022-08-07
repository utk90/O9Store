import React, { useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
// import Backdrop from '@material-ui/core/';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { Backdrop } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { cartItems } = useSelector(state => state.cart);

    const options = [
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
        { icon: <PersonIcon />, name: 'Profile', func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? '#203847' : 'unset' }} />, name: `Cart${cartItems.length}`, func: cart },
        { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
    ];

    if (user.role === 'admin') {
        options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard });
    }

    function dashboard() {
        navigate('/admin/dashboard');
    }
    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/account');
    }
    function cart() {
        navigate('/cart');
    }
    function logoutUser() {
        dispatch(logout());
        alert.success('Logged out successfully!!');
        navigate('/');
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: '10' }} />
            <div style={{
                height: '100px',
                position: 'fixed',
                left: '95%',
                'zIndex': 10,
            }}>
                <SpeedDial
                    ariaLabel="SpeedDial tooltip"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    icon={
                        <img className='speedDialIcon'
                            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                            alt="Profile"
                        />
                    }
                />
                {options.map(item => <SpeedDialAction direction={"right"} key={item.name} icon={item.icon} open={open} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 640 ? true : false} />)}

            </div>
        </>
    )
}

export default UserOptions