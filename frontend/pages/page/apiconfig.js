import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from '../../HOC/withAuth';
import { useExchangeContext } from '../../Context/ExchangeContext';
import Link from 'next/link';


const apiconfig = () => {

    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [token, setToken] = useState('');
    const { selectedExchange } = useExchangeContext();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);

const exchangeName = selectedExchange;

    const handleSave = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exchange/exchangeconfiguration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({ apiKey, apiSecret,exchangeName }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success("API key & secret saved");
            } else {
                const errorData = await response.json();
                throw new Error(`Failed to save API key & secret: ${response.status} - ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error saving API key & secret:', error);
            toast.error("Failed to save API key & secret. Please try again later.");
        }
    };

    return (

        <div className=" fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-4 mb-12">
                    <p tabIndex={0} role="heading" aria-label="" className="text-xl font-bold leading-6 text-white text-center mt-16 mb-4">Configure Bybit API</p>


                    <div >
                        <lable className="text-xs font-sans leading-none text-white mt-4"> Selected Exchange</lable>
                        <div className="relative flex items-center justify-center">
                            <input
                                value={selectedExchange}
                                aria-label="enter api key"
                                role="input" type="text"
                                className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">

                            </div>
                        </div>
                    </div>

                    <div >
                        <lable className="text-xs font-sans leading-none text-white">API Key</lable>
                        <div className="relative flex items-center justify-center">
                            <input
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                aria-label="enter api key"
                                role="input" type="text"
                                className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">

                            </div>
                        </div>
                    </div>
                    <div >
                        <lable className="text-xs font-sans leading-none text-white">API Secret</lable>
                        <div className="relative flex items-center justify-center">
                            <input
                                value={apiSecret}
                                onChange={(e) => setApiSecret(e.target.value)}
                                aria-label="enter api secret"
                                role="input" type="text"
                                className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">

                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href='/page/CreateBot'>
                        <button
                            onClick={handleSave}
                            role="button"
                            aria-label=""
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700  rounded hover:bg-indigo-600 py-4 w-full" style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}>
                            Save
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(apiconfig);
