import React from 'react'

function dashboard() {


    const numOfUsers = 2;
    const numOfExchanges = 4;
    const numOfActiveBots = 2;
    return (
        <div>
            <div className="p-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-m font-semibold">Total Users</h3>
                        <p className="text-2xl">{numOfUsers}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-m font-semibold">Active Exchanges</h3>
                        <p className="text-2xl">{numOfExchanges}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-m font-semibold"> Active Bots</h3>
                        <p className="text-2xl">{numOfActiveBots}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-m font-semibold"> Active Bots</h3>
                        <p className="text-2xl font-blue">{numOfActiveBots}</p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-m font-semibold mb-4">Graph</h3>
                    <div className="h-64">
                        {/* Your graph component goes here */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default dashboard
