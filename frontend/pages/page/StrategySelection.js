import React, { useState } from 'react';

function TradingStrategySelector() {
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [showLeverageOptions, setShowLeverageOptions] = useState(false);

    const handleStrategyChange = (event) => {
        const strategy = event.target.value;
        setSelectedStrategy(strategy);

        // If futures strategy is selected, show leverage options
        if (strategy === 'futures') {
            setShowLeverageOptions(true);
        } else {
            setShowLeverageOptions(false);
        }
    };

    const strategyOptions = [
        {
            name: 'spot',
            description: 'Spot trading involves buying or selling assets for immediate delivery at the current market price. Strategies can include buy and hold, market making, arbitrage, and swing trading.',
        },
        {
            name: 'futures',
            description: 'Futures trading involves buying or selling contracts that obligate parties to transact an asset at a future date and price. Strategies may include hedging, speculation, spread trading, and arbitrage.',
        },
    ];

    return (

        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[55%] md:w-[40%] w-full p-10 mt-4 mb-12 text-white">
                    <div>
                        <p tabIndex={0} role="heading" aria-label="" className="text-xl font-bold leading-6 text-white text-center mt-4 mb-8">Trading Strategy</p>


                        {strategyOptions.map((strategy) => (
                            <div key={strategy.name} style={{ marginBottom: '20px' }}>
                                <h2 style={{color:'#0086c9'}}>{strategy.name.charAt(0).toUpperCase() + strategy.name.slice(1)} Trading Strategy</h2>
                                <p>{strategy.description}</p>
                                <button
                                    onClick={() => handleStrategyChange({ target: { value: strategy.name } })}
                                    style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                                >Select {strategy.name}</button>
                                <div className="mt-6">

                                </div>
                            </div>
                        ))}

                        {showLeverageOptions && selectedStrategy === 'futures' && (
                            <div>
                                <h2>Leverage Options</h2>
                                <p>Select the leverage you want:</p>

                                <label>
                                    <input type="radio" name="leverage" value="1x" />
                                    1x Leverage
                                </label><br />
                                <label>
                                    <input type="radio" name="leverage" value="5x" />
                                    5x Leverage
                                </label><br />
                                <label>
                                    <input type="radio" name="leverage" value="10x" />
                                    10x Leverage
                                </label><br />

                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>


    );
}

export default TradingStrategySelector;
