import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from "../Context/AuthContext";


function MyApp({ Component, pageProps }) {
    return (
        <>
        <AuthProvider>
            <ToastContainer />
            <Component {...pageProps} />
        </AuthProvider>

        </>
    );
}

export default MyApp;