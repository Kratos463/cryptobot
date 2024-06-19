import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../Context/AuthContext';

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
            return <div>Loading...</div>;
        }

        if (!isAuthenticated()) {
            return null; 
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
