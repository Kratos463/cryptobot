
import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const { authState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            router.push('/login');
        }
    }, [authState.isAuthenticated, router]);

    return authState.isAuthenticated ? children : null;
};

export default PrivateRoute;
