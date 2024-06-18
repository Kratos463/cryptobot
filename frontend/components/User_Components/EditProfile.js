import React from 'react';

const EditProfile = () => {
    return (
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-2 sm:max-w-xl sm:rounded-lg">
                <h2 className="text-2xl font-bold sm:text-xl text-white">Edit Profile</h2>
                <div className="grid max-w-2xl mx-auto">
                    <div className="items-center pt-4 text-[#202142]">
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label htmlFor="full_name" className="block text-sm font-medium text-white">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                    style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                    placeholder=""
                                    value=""
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="phone" className="block text-sm font-medium text-white">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="address" className="block text-sm font-medium text-white">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label htmlFor="country" className="block text-sm font-medium text-white">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                    style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                    placeholder=""
                                    value=""
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="state" className="block text-sm font-medium text-white">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                    style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                    placeholder=""
                                    value=""
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label htmlFor="city" className="block text-sm font-medium text-white">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                    style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                    placeholder=""
                                    value=""
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="zipcode" className="block text-sm font-medium text-white">
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    id="zipcode"
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                    style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                                    placeholder=""
                                    value=""
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                                style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
