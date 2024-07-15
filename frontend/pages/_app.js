import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from "../Context/AuthContext";
import { ExchangeProvider } from "../Context/ExchangeContext";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Cryptobot</title>
                <meta name="description" content="Empower your cryptocurrency trading with our advanced Crypto Trading Bot" />
            </Head>
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
