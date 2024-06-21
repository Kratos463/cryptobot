import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoPairsList = () => {
    const [cryptoPairs, setCryptoPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState(null);

    useEffect(() => {
        const fetchCryptoPairs = async () => {
            try {
                const response = await axios.get('https://api.bybit.com/v2/public/symbols');
                if (response.data && response.data.result) {
                    setCryptoPairs(response.data.result);
                }
            } catch (error) {
                console.error('Error fetching trading pairs:', error);
            }
        };

        fetchCryptoPairs();
    }, []);

    const handleSelectPair = (pair) => {
        setSelectedPair(pair);
    };

    return (
        <div className="fixed w-full h-full flex items-center justify-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[95%] md:w-[120%] w-full p-10 mt-4 mb-12 text-white bg-opacity-80 bg-black">
                    <p className="text-xl font-bold leading-6 text-center mt-4 mb-8" style={{color:'#0086c9'}}>Select Crypto Pair</p>
                    <div className="overflow-y-auto h-96">
                        <table className="min-w-full bg-black bg-opacity-60 rounded">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-700">Pair</th>
                                    <th className="py-2 px-4 border-b border-gray-700">Base Currency</th>
                                    <th className="py-2 px-4 border-b border-gray-700">Quote Currency</th>
                                    <th className="py-2 px-4 border-b border-gray-700"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoPairs.map(pair => (
                                    <tr key={pair.name} className="hover:bg-gray-800">
                                        <td className="py-2 px-4 border-b border-gray-700">{pair.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{pair.base_currency}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{pair.quote_currency}</td>
                                        <td className="py-2 px-4 border-b border-gray-700 text-right">
                                            <button onClick={() => handleSelectPair(pair)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded">Select</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {selectedPair && (
                        <div className="mt-4 p-4 bg-gray-800 rounded text-center">
                            <p>Selected Pair: {selectedPair.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptoPairsList;
