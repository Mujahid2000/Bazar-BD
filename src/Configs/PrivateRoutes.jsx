import { Navigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Loading from '../Components/Loading/Loading';
import { VerifyContext } from './VerifyToken';



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { token, verifyToken } = useContext(VerifyContext);
    const location = useLocation();

    useEffect(() => {
        // Verify token when component mounts
        verifyToken()
            .catch(error => {
                console.error('Token verification failed:', error);
            });
            
    }, [verifyToken, token]);

    if (loading)
        return <Loading />;

    if (user) {
        return children;
    }

    // If user is not authenticated, redirect to sign-in page
    return <Navigate state={location.pathname} to={'/signIn'} />;
};

export default PrivateRoute;
