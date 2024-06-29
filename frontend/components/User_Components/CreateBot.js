import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useExchangeContext } from '../../Context/ExchangeContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CreateBot = () => {
    const [botName, setBotName] = useState('');
    const [strategyType, setStrategyType] = useState('Spot');
    const [accountBalance, setAccountBalance] = useState(0);
    const [cryptoPairs, setCryptoPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState('');
    const [leverage, setLeverage] = useState(1);
    const [orderQty,setOrderQty] = useState('')
    const { selectedExchange } = useExchangeContext();
    const exchangeName = selectedExchange;
    const router = useRouter();



    useEffect(() => {
        fetchCryptoPairs();
    }, []);

    useEffect(() => {
        // now only fetching the accountbalcne when its futures
        if (strategyType === 'Futures' && selectedPair) {
            fetchAccountBalance(selectedPair);
        }
    }, [strategyType, selectedPair]);

    // -----------Fetching wallet balane------------

    const fetchAccountBalance = async (pair) => {
        // formated for getting wallet balance
        const formattedPair = pair.replace(/(.{4})/g, '$1,').slice(0, -1);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/walletbalance`, {
                exchangeName,
                strategyType: strategyType,
                accountType: "UNIFIED",// now its unified accounttype bcz testnet if the ,[for spot =>AccountType =SPOT,for futures =Contract]
                coin: formattedPair,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAccountBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching account balance:', error);
        }
    };

    // ------------Fetching crypto pairs----------

    const fetchCryptoPairs = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BYBIT_API);
            setCryptoPairs(response.data.result);
        } catch (error) {
            console.error('Error fetching crypto pairs:', error);
        }
    };

    // ---------- Creating bot------------------

    const createBot = async () => {

        try {
            const botData = {
                botName,
                exchangeName,
                strategy: strategyType,
                cryptoPair: selectedPair,
                orderQuantity :orderQty,
                leverage: strategyType === 'Futures' ? leverage : 1,
            };

            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bot/createbot`, botData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Bot created successfully')
            const userId = response.data.user;
            const botId = response.data._id;
            router.push(`/page/GetWebhookurl?userId=${userId}&botId=${botId}`)
            // console.log('Bot created successfully:', response.data);
        } catch (error) {
            toast.error('Error creating Bot')
            console.error('Error creating bot:', error);
        }
    };


    return (
        <div className="fixed w-full h-full items-center" >
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[55%] md:w-[40%] w-full p-10 mt-4 mb-12 text-white">
                    <div>
                        <p className="text-xl font-bold leading-6 text-white text-center mt-12 mb-8">Create Trading Bot</p>
                        <div>
                            <label>Bot Name</label>
                            <input
                                type="text"
                                placeholder="Bot Name"
                                value={botName}
                                onChange={(e) => setBotName(e.target.value)}
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} 
                                className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "
                            />
                        </div>
                        <div className="mt-4">
                            <label>Select cryptoPairs</label>
                            <select
                                value={selectedPair}
                                onChange={(e) => setSelectedPair(e.target.value)}
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                                className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "
 
                            >
                                {cryptoPairs.map(pair => (
                                    <option key={pair.name} value={pair.name} className='text-white'>
                                        {`${pair.base_currency}, ${pair.quote_currency}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 pt-2">Trade In</label>
                            <div className="space-y-2">
                                <label className=" items-center">
                                    <input
                                        type="radio"
                                        value="Spot"
                                        checked={strategyType === 'Spot'}
                                        onChange={(e) => setStrategyType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span>Spot</span>
                                </label>
                                <label className=" items-center">
                                    <input
                                        type="radio"
                                        value="Futures"
                                        checked={strategyType === 'Futures'}
                                        onChange={(e) => setStrategyType(e.target.value)}
                                        className="ml-4 mr-2"
                                    />
                                    <span>Futures</span>
                                </label>
                            </div>
                        </div>

                        {strategyType === 'Futures' && selectedPair && (
                            <div className="mt-4">
                                <p>Account Balance: ${accountBalance}</p>
                                <p>Leverage: {leverage}x</p>
                                <label>
                                    Leverage:
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={leverage}
                                        onChange={(e) => setLeverage(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                        <div className='mt-4'>
                            <label>Order Quantity</label>
                            <input
                                type="text"
                                placeholder="order quantity"
                                value={orderQty}
                                onChange={(e) => setOrderQty(e.target.value)}
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                                className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "

                            />
                        </div>

                        <button
                            onClick={createBot}
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700  rounded hover:bg-indigo-600 py-4 mt-8 w-full" style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}>
                        
                            Create Bot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBot;