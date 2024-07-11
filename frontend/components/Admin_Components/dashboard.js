import React from 'react'

function dashboard() {


    const numOfUsers = 150;
    const numOfExchanges = 45;
    const numOfActiveBots = 30;
    return (
        <div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold">Number of Users</h3>
                        <p className="text-2xl">{numOfUsers}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold">Number of Exchanges</h3>
                        <p className="text-2xl">{numOfExchanges}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold">Number of Active Bots</h3>
                        <p className="text-2xl">{numOfActiveBots}</p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Graph</h3>
                    <div className="h-64">
                        {/* Your graph component goes here */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default dashboard
