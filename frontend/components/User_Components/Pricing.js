import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Pricing() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/fetch_subcriptionPlans`);
                setPlans(response.data.plans); 
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, []);

    if (plans.length === 0) {
        return <p>Loading...</p>; 
    }

    return (
        <section className="bg-gray-900 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-extrabold text-white sm:text-2xl">
                        Pricing Plans
                    </h2>
                    <p className="mt-2 text-xl text-gray-400">
                        Simple, transparent pricing for your trading needs.               
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {plans.map((plan) => (
                        <div key={plan._id} className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                            <div className="mb-8 text-center">
                                <h3 className="text-2xl font-semibold text-white">{plan.planName}</h3>
                                <p className="mt-4 text-gray-400">{plan.description}</p>
                            </div>
                            <div className="mb-8 text-center">
                                <span className="text-4xl font-extrabold text-white  " style={{ color: '#0086c9' }}>${plan.price}</span>
                                <span className="text-xl font-medium text-gray-400">/mo</span>
                            </div>
                            <ul className="mb-8 space-y-4 text-gray-400">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="/order" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                Buy Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;
