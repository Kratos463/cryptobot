import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ExchangeList() {

    const [exchange, setExchange] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchExchanges = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bot/mybots`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setExchange(response.data);

            } catch (error) {
                console.error('Error in fetching bots :', error)
            }
        };
        fetchExchanges();
    },[])

    return (
        <div>

        </div>
    )
}

export default ExchangeList
