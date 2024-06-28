import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BotList() {
    const [bots, setBots] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchBots = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bot/mybots`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBots(response.data);
            } catch (error) {
                console.error('Error fetching bots:', error);
            }
        };

        fetchBots();
    }, []);

    const handleToggleStatus = (botId, active) => {
        console.log(`Toggling bot ${botId} status to ${active ? 'active' : 'stopped'}`);
    };

    return (
<div className="fixed w-full h-full flex items-start justify-center mt-28">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p tabIndex={0} role="heading" aria-label="Select Exchange" className="text-2xl font-bold leading-6 text-white text-center mb-4">My Bots</p>
        <table className="w-full text-sm text-left text-gray-300 bg-gray-900">
            <thead className="text-xs text-gray-300 uppercase bg-blue-900">
                <tr>
                    <th className="px-6 py-3">Bot Name</th>
                    <th className="px-6 py-3">Exchange</th>
                    <th className="px-6 py-3">Crypto Pair</th>
                    <th className="px-6 py-3">Strategy</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {bots.map((bot) => (
                    <tr key={bot._id} className="odd:bg-gray-800 even:bg-gray-700 border-b border-gray-600">
                        <th className="px-6 py-4 font-medium text-white whitespace-nowrap">{bot.botName}</th>
                        <td className="px-6 py-4">{bot.exchangeName}</td>
                        <td className="px-6 py-4">{bot.cryptoPair}</td>
                        <td className="px-6 py-4">{bot.strategy}</td>
                        <td className="px-6 py-4">{bot.active ? 'Active' : 'Stopped'}</td>
                        <td className="px-6 py-4">
                            <button
                                onClick={() => handleToggleStatus(bot._id, !bot.active)}
                                className={`px-4 py-2 rounded ${bot.active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                            >
                                {bot.active ? 'Stop' : 'Activate'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>




    );
}

export default BotList;
