import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({ isAdmin = false, children }) => {
    const { user, loading = true, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading === false && isAuthenticated === false) {
            navigate('/login');
            return;
        }

        if (user?.role && user.role !== 'admin' && isAdmin === false) {
            navigate('/account');
            return;
        }
    }, [isAdmin, isAuthenticated, loading, navigate, user?.role])

    return loading === false ? children : <Loader />;
}

export default ProtectedRoute