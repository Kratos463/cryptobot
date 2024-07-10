import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function AddExchange() {
    const [exchangeName, setExchangeName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('exchangeName', exchangeName);
            formData.append('description', description);
            formData.append('image', image);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create_exchange`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: "success",
                title: "Exchange Added Successfully",
                showConfirmButton: true,
                timer: 1500
            });
            router.push('/Admin/Exchange/ExchangeList');

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error Adding Exchange",
                text: "Something went wrong!",
                showConfirmButton: true,
                timer: 1500
            });
            console.error('Error occurred in adding exchange', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <>
            <div className="px-2 py-12 w-full h-screen overflow-auto">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow py-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="px-7">
                                        <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Add Exchange
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Exchange Name
                                                </p>
                                                <input
                                                    placeholder="Enter exchange name"
                                                    type="text"
                                                    value={exchangeName}
                                                    onChange={(e) => setExchangeName(e.target.value)}
                                                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Exchange Logo
                                                </p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Description
                                                </p>
                                                <input
                                                    placeholder="Enter description"
                                                    type="text"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="h-[1px] bg-gray-100 my-4" />
                                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                        <button
                                            type="button"
                                            className="bg-white border-indigo-700 rounded hover:bg-gray-50 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-indigo-700 border lg:max-w-[95px]  w-full"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full"
                                            style={{ backgroundColor: '#0086c9' }}
                                        >
                                            Add Exchange
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddExchange;