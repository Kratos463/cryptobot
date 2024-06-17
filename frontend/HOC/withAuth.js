import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../Context/AuthContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { isAuthenticated } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated()) {
                router.replace('/page/Login');
            } else {
                router.replace('/page/Home'); 
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated()) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
