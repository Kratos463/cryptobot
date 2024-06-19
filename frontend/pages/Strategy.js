import { useState } from 'react';

const Strategy = () => {
    const [selectedStrategy, setSelectedStrategy] = useState('MA_Cross');

    const handleSaveStrategy = async () => {
        const response = await fetch('/api/saveStrategy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ strategy: selectedStrategy }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <h2>Select Strategy</h2>
            <select value={selectedStrategy} onChange={(e) => setSelectedStrategy(e.target.value)}>
                <option value="MA_Cross">MA Cross</option>
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
            </select>
            <button onClick={handleSaveStrategy}>Save Strategy</button>
        </div>
    );
};

export default Strategy;
