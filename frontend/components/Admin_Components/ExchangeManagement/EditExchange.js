import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function EditExchange() {
    const [exchangeName, setExchangeName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    // -------- Fetching exchange details by id------------------

    useEffect(() => {
        const fetchExchangeDetails = async () => {

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get_exchange/${id}`);
                const { exchangeName, description, imageUrl } = response.data;
                setExchangeName(exchangeName);
                setDescription(description);
                setImage(imageUrl);
                setImagePreview(imageUrl);
            } catch (error) {
                console.error('Error fetching exchange details:', error);
            }
        };
        if (id) {
            fetchExchangeDetails();
        }
    }, [id]);

    // --------------Submiting the Edited Exchange--------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('exchangeId', id);
            formData.append('exchangeName', exchangeName);
            formData.append('description', description);
            formData.append('image', image);
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/Edit_exchange`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: "success",
                title: "Exchange Edited Successfully",
                showConfirmButton: true,
                timer: 1500
            });
            router.push('/Admin/Exchange/Exchange_page');

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error editing Exchange",
                text: "Something went wrong!",
                showConfirmButton: true,
                timer: 1500
            });
            console.error('Error occurred in editing exchange', error);
        }
    };

    // -----------Image Change----------------

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
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
                                            Edit Exchange
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
                                            {imagePreview && (
                                                <div className="mt-4">
                                                    <p className="text-base font-medium leading-none text-gray-800 ">
                                                        Image Preview:
                                                    </p>
                                                    <img src={imagePreview} alt="Image Preview" className="mt-2 rounded w-20 h-20" />
                                                </div>
                                            )}
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
                                            Edit Exchange
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

export default EditExchange;
