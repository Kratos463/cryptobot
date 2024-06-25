import React, { useState } from 'react';
import { useExchangeContext } from '../../Context/ExchangeContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const exchanges = [
    { name: 'Bybit', value: 'bybit', logo: '/Assets/bybit-logo.jpg', description: 'Bybit is a leading crypto derivatives exchange.', active: true },
    { name: 'Binance', value: 'binance', logo: '/Assets/binancelogo.jpg', description: 'Binance is the world’s largest crypto exchange.', active: false },
    { name: 'Coinbase', value: 'coinbase', logo: '/Assets/coinbase.jpg', description: 'Coinbase is a secure online platform for buying, selling.', active: false },
    { name: 'Kraken', value: 'kraken', logo: '/Assets/kraken.jpg', description: 'Kraken is a US-based cryptocurrency exchange.', active: false }
];



function ExchangeSelection() {
    const router = useRouter();
    const [selectedExchange, setSelectedExchange] = useState(exchanges.find(ex => ex.active)?.value || '');
    const { storeSelectedExchange } = useExchangeContext();



    const handleExchangeSelect = (value) => {
        if (exchanges.find(ex => ex.value === value).active) {
            setSelectedExchange(value);
        }
    }

    const handleSave = () => {
        if (selectedExchange) {
            storeSelectedExchange(selectedExchange);
            toast.success('Exchange selected successfully');
            router.push('/page/apiconfig');
        } else {
            toast.error('Please select an exchange');
        }
    };

    return (
        <div className="fixed w-full h-full flex items-center justify-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded-lg w-full max-w-[1200px] p-10 mt-4 mb-12 ">
                    <p tabIndex={0} role="heading" aria-label="Select Exchange" className="text-2xl font-bold leading-6 text-white text-center mb-8">Select Exchange</p>

                    <div className="mt-6 flex flex-wrap justify-center gap-8">
                        {exchanges.map(exchange => (
                            <div
                                key={exchange.value}
                                onClick={() => handleExchangeSelect(exchange.value)}
                                className={`relative flex flex-col items-center justify-center cursor-pointer p-6 rounded-lg ${selectedExchange === exchange.value ? 'bg-blue-700' : 'bg-black'} transition-all duration-300 transform ${exchange.active ? 'hover:bg-blue-500 hover:scale-105' : ''}`}
                                style={{ border: selectedExchange === exchange.value ? '3px solid #043bbc' : '1px solid #043bbc', width: '240px', height: '240px' }}
                            >
                                <img src={exchange.logo} alt={`${exchange.name} Logo`} className="w-24 h-24 mb-4 rounded-full" />
                                <span className="text-white font-semibold text-lg">{exchange.name}</span>
                                <p className="text-white text-center mt-2">{exchange.description}</p>
                                {!exchange.active && (
                                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-4 flex items-center justify-center bg-white bg-opacity-100">
                                        <span className="text-black font-semibold">Inactive</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>



                    <div className="mt-8 pl-56" >
                        <button
                            onClick={handleSave}
                            role="button"
                            aria-label="Save Exchange"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-lg font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-[65%]"
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
