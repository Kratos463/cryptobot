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
    const [useLeverage, setUseLeverage] = useState(false);
    const { selectedExchange } = useExchangeContext();
    const exchangeName = selectedExchange;
    const router = useRouter();

    console.log(strategyType)

    const createBot = async () => {
        try {
            const botData = {
                botName,
                exchangeName,
                category: strategyType,
                isLeverage: useLeverage ? 1 : 0,
            };

            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bot/createbot`, botData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Bot created successfully');
            console.log(response.data);
            const shortId = response.data.shortId;
            router.push(`/page/Webhook?shortId=${shortId}`);
        } catch (error) {
            toast.error('Error creating Bot');
            console.error('Error creating bot:', error);
        }
    };

    return (
        <div className="fixed w-full h-full items-center">
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
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 pt-2">Trade In</label>
                            <div className="space-y-2">
                                <label className="items-center">
                                    <input
                                        type="radio"
                                        value="Spot"
                                        checked={strategyType === 'Spot'}
                                        onChange={(e) => setStrategyType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span>Spot</span>
                                </label>
                                <label className="items-center">
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

                        <div className="pt-4">
                            <label className="items-center">
                                <input
                                    type="checkbox"
                                    checked={useLeverage}
                                    onChange={(e) => setUseLeverage(e.target.checked)}
                                    className="mr-2"
                                />
                                <span>Use Leverage</span>
                            </label>
                        </div>

                        <button
                            onClick={createBot}
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 mt-8 w-full"
                            style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}
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
