import React, { useState, useEffect } from 'react';
import { useExchangeContext } from '../../Context/ExchangeContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ExchangeSelection() {
    const router = useRouter();
    const { storeSelectedExchange } = useExchangeContext();
    const [exchanges, setExchange] = useState([]);
    const [selectedExchange, setSelectedExchange] = useState('');

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get_exchange`);
                setExchange(response.data.exchangeList); 
                console.log(response.data);
            } catch (error) {
                console.error("Error in fetching active exchanges:", error);
            }
        };
        fetchExchanges();
    }, []);

    const handleExchangeSelect = (value) => {
        const selected = exchanges.find(ex => ex.exchangeName === value);
        if (selected && selected.status) {
            setSelectedExchange(value);
        }
    }

    const handleSave = () => {
        if (selectedExchange) {
            storeSelectedExchange(selectedExchange);
            toast.success('Exchange selected successfully');
            router.push('/page/ApiConfiguration');
        } else {
            toast.error('Please select an exchange');
        }
    };

    return (
        <div className=" w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded-lg w-full max-w-[1200px] p-10 mt-4 mb-12">
                    <p tabIndex={0} role="heading" aria-label="Select Exchange" className="text-2xl font-bold leading-6 text-white text-center mb-8 mt-12">Select Exchange</p>

                    <div className="mt-6 flex flex-wrap justify-center gap-8">
                        {exchanges.map(exchange => (
                            <div
                                key={exchange._id}
                                onClick={() => handleExchangeSelect(exchange.exchangeName)}
                                className={`relative flex flex-col items-center justify-center cursor-pointer p-6 rounded-lg ${selectedExchange === exchange._id ? 'bg-black' : 'bg-black'} transition-all duration-300 transform ${exchange.status ? 'hover:bg-blue-500 hover:scale-105' : ''}`}
                                style={{ border: selectedExchange === exchange._id ? '3px solid #043bbc' : '1px solid #043bbc', width: '240px', height: '240px' }}
                            >
                                <img src={exchange.imageUrl.replace('\\', '/')} alt={`${exchange.exchangeName} Logo`} className="w-24 h-24 mb-4 rounded-full" />
                                <span className="text-white font-semibold text-lg">{exchange.exchangeName}</span>
                                <p className="text-white text-center mt-2">{exchange.description}</p>
                                {!exchange.status && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg">
                                        <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Inactive</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pl-64">
                        <button
                            onClick={handleSave}
                            role="button"
                            aria-label="Save Exchange"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-lg font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-[65%]"
                            style={{ backgroundColor: '#043bbc', border: '1px solid #043bbc' }}
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
