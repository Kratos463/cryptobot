import React, { useState, useContext } from 'react';
import { useExchangeContext } from '../../Context/ExchangeContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ExchangeSelection() {
    const router = useRouter();
    const [selectedExchange, setSelectedExchange] = useState('');
    const { storeSelectedExchange } = useExchangeContext(); 

    const handleExchangeSelect = (event) => {
        setSelectedExchange(event.target.value);
    };

    const handleSave = () => {
        storeSelectedExchange(selectedExchange); 
        toast.success('Exchange selected successfully')
        router.push('/page/apiconfig'); 
    };

    return (
        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-4 mb-12">
                    <p tabIndex={0} role="heading" aria-label="" className="text-xl font-bold leading-6 text-white text-center mt-16">Select Exchange</p>

                    <div className="mt-6">
                        {/* <label className="text-xs font-sans leading-none text-white">Select Exchange</label> */}
                        <div className="relative flex items-center justify-center">
                            <select
                                value={selectedExchange}
                                onChange={handleExchangeSelect}
                                aria-label="Select Exchange"
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                            >
                                <option value="">Select an Exchange</option>
                                <option value="bybit">Bybit</option>
                                <option value="binance">Binance</option>
                                <option value="coinbase">Coinbase</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSave}
                            role="button"
                            aria-label="Save Exchange"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                            style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSelection;
