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

        <div className="fixed w-full h-full flex items-center justify-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <p tabIndex={0} role="heading" aria-label="Select Exchange" className="text-2xl font-bold leading-6 text-white text-center mb-8">My Bots</p>

                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300">Bot Name</th>
                                <th className="py-2 px-4 border-b border-gray-300">Exchange</th>
                                <th className="py-2 px-4 border-b border-gray-300">Crypto Pair</th>
                                <th className="py-2 px-4 border-b border-gray-300">Strategy</th>
                                <th className="py-2 px-4 border-b border-gray-300">Status</th>
                                <th className="py-2 px-4 border-b border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bots.map((bot) => (
                                <tr key={bot._id}>
                                    <td className="py-2 px-4 border-b border-gray-300">{bot.botName}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{bot.exchangeName}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{bot.cryptoPair}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{bot.strategy}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{bot.active ? 'Active' : 'Stopped'}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <button
                                            onClick={() => handleToggleStatus(bot._id, !bot.active)}
                                            className={`px-4 py-2 rounded ${bot.active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                                }`}
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
        </div>



    );
}

export default BotList;
