import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useExchangeContext } from '../../Context/ExchangeContext';


const CreateBot = () => {
    const [botName, setBotName] = useState('');
    const [strategyType, setStrategyType] = useState('Spot');
    const [accountBalance, setAccountBalance] = useState(0);
    const [cryptoPairs, setCryptoPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState('');
    const [leverage, setLeverage] = useState(1);

    const { selectedExchange } = useExchangeContext();


    useEffect(() => {
        // Fetch account balance when strategy type changes
        if (strategyType === 'Futures') {
            fetchAccountBalance();
        }
        
        fetchCryptoPairs();
    }, [strategyType]);


    // ------- fetching account balance from bybit-------------

    const fetchAccountBalance = async () => {
        try {
            const response = await axios.post('http://localhost:8001/accountbalance', {
                exchangeName: selectedExchange, 
                strategyType: strategyType
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
    // --------- Get the crypto pairs from bybit------------

    const fetchCryptoPairs = async () => {
        try {
            const response = await axios.get('https://api.bybit.com/v2/public/symbols');
            setCryptoPairs(response.data.result);
        } catch (error) {
            console.error('Error fetching crypto pairs:', error);
        }
    };

    // ------ Creating Bot ---------------

    const createBot = async () => {
        try {
            const botData = {
                botName,
                strategyType,
                selectedPair,
                leverage: strategyType === 'Futures' ? leverage : 1,
            };
            const response = await axios.post('http://localhost:8001/createbot', botData);
            console.log('Bot created successfully:', response.data);
        } catch (error) {
            console.error('Error creating bot:', error);
        }
    };

    return (
        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[55%] md:w-[40%] w-full p-10 mt-4 mb-12 text-white">
                    <div>
                        <p className="text-xl font-bold leading-6 text-white text-center mt-4 mb-8">Create Trading Bot</p>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Bot Name" 
                                value={botName} 
                                onChange={(e) => setBotName(e.target.value)} 
                                className="mb-4 p-2 w-full text-black"
                            />
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    value="Spot" 
                                    checked={strategyType === 'Spot'} 
                                    onChange={(e) => setStrategyType(e.target.value)} 
                                /> Spot
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    value="Futures" 
                                    checked={strategyType === 'Futures'} 
                                    onChange={(e) => setStrategyType(e.target.value)} 
                                /> Futures
                            </label>
                        </div>
                        {strategyType === 'Futures' && (
                            <div className="mt-4">
                                <p>Account Balance: ${accountBalance}</p>
                                <label>
                                    Leverage: 
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="100" 
                                        value={leverage} 
                                        onChange={(e) => setLeverage(e.target.value)} 
                                    />
                                    {leverage}x
                                </label>
                            </div>
                        )}
                        <div className="mt-4">
                            <select 
                                value={selectedPair} 
                                onChange={(e) => setSelectedPair(e.target.value)} 
                                className="mb-4 p-2 w-full text-black"
                            >
                                {cryptoPairs.map(pair => (
                                    <option key={pair.name} value={pair.name} className='text-black'>{pair.name}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={createBot} 
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Create Bot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBot;
