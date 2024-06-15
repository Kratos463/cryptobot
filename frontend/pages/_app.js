import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css'


function MyApp({ Component, pageProps }) {
    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;