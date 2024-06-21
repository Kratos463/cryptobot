import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from "../Context/AuthContext";
import { ExchangeProvider } from "../Context/ExchangeContext";


function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <ExchangeProvider>
                    <Component {...pageProps} />
                    <ToastContainer />
                </ExchangeProvider>
            </AuthProvider>

        </>
    );
}

export default MyApp;