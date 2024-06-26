import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../Context/AuthContext';
import  Loader from '../components/User_Components/Loader';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { isAuthenticated, loading } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isAuthenticated()) {
                router.replace('/page/Login');
            }
        }, [loading, isAuthenticated, router]);

        if (loading) {
            return <Loader />;
        }

        if (!isAuthenticated()) {
            return null; 
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
