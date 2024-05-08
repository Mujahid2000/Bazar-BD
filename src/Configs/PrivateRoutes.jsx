
import { Navigate, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Loading from '../Components/Loading/Loading';



const PrivateRoute = ({ children }) => {

    const { user,loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(user);

    if (loading)
        return<Loading ></Loading>


    if (user) {

        return children;
    }
    return <Navigate state={location.pathname} to={'/signIn'}></Navigate>

};



export default PrivateRoute;