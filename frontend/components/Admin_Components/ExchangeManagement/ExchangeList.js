import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';


function ExchangeList() {
    const [exchange, setExchange] = useState([]);
    const router = useRouter();

    // -----------Fetching data from backend to list the exchange ---------------

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get_exchange`);
                setExchange(response.data.exchangeList);
                // console.log(response.data.exchangeList);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, [exchange]);

    // -------------Redirect to edit exchange--------------

    const handleEdit = (exchangeId) => {

        router.push({
            pathname: '/Admin/Exchange/Edit_exchange_page',
            query: { id: exchangeId },
        });
    };

    // -------------Deletion of  exchange-----------------

    const handleDelete = async (exchangeId) => {

        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete_exchange/${exchangeId}`);

                Swal.fire({
                    title: "Deleted!",
                    text: "Your exchange has been deleted.",
                    icon: "success"
                });


            }

        } catch (error) {
            console.error('Error deleting plan:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete the exchange. Please try again later.",
                icon: "error"
            });
        }
    };

    // ------- trucate function for decription-------

    const truncateDescription = (description, length = 3) => {
        const words = description.split(' ');
        if (words.length <= length) return description;
        return words.slice(0, length).join(' ') + '...';
    };

    // -------------Status updation --------------------

    const handleStatusToggle = async (exchangeId) => {
        try {
            const exchangeToUpdate = exchange.find(exchange => exchange._id === exchangeId);
            const newStatus = !exchangeToUpdate.status;
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update_exchange_status/${exchangeId}`, { status: newStatus });
            setExchange(exchange.map(exchange => {
                if (exchange._id === exchangeId) {
                    return { ...exchange, status: newStatus };
                }
                return exchange;
            }));
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update the exchange status.",
                icon: "error"
            });
        }
    };

    // ----------Style for description hover --------------

    const descriptionStyle = {
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
    };

    const fullDescriptionStyle = {
        display: 'none',
        position: 'absolute',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ddd',
        padding: '5px',
        zIndex: 1,
        whiteSpace: 'nowrap',
    };

    const fullDescriptionVisibleStyle = {
        display: 'block',
    };



    return (
        <>
            <div className="w-70 sm:px-6 mt-4">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Exchanges</p>
                        <div className="mr-9">
                            <Link href='/Admin/Exchange/Add_exchange_page'>
                                <button className="inline-flex sm:ml-2 mt-4 sm:mt-0 items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" style={{ backgroundColor: '#0086c9' }}>
                                    <p className="text-sm font-medium leading-none text-white">+ Add Exchange</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-semibold text-left pl-2">Exchange Logo</th>
                                <th className="font-semibold text-left pl-8">Exchange Name</th>
                                <th className="font-semibold text-left pl-12">Description</th>
                                <th className="font-semibold text-left pl-12">Status</th>
                                <th className="font-semibold text-left pl-20">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {exchange.map(exchange => (
                                <tr key={exchange._id} className="h-20 text-sm leading-none text-gray-800 border-b border-t bg-white hover:bg-gray-100 border-gray-100">
                                    <td className="pl-4 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10">
                                                <img className="w-full h-full" src={exchange.imageUrl} alt="Exchange Image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-8 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="">
                                                <p className="font-medium">{exchange.exchangeName}</p>
                                            </div>
                                        </div>
                                    </td>


                                    <td className="pl-12">
                                        <div
                                            className="flex items-center"
                                            style={descriptionStyle}
                                            onMouseEnter={() => {
                                                document.getElementById(`full-desc-${exchange._id}`).style.display = 'block';
                                            }}
                                            onMouseLeave={() => {
                                                document.getElementById(`full-desc-${exchange._id}`).style.display = 'none';
                                            }}
                                        >
                                            <p className="font-medium">{truncateDescription(exchange.description)}</p>
                                            <span
                                                id={`full-desc-${exchange._id}`}
                                                style={{ ...fullDescriptionStyle }}
                                            >
                                                {exchange.description}
                                            </span>
                                        </div>
                                    </td>

                                    <td onClick={() => handleStatusToggle(exchange._id)} className="cursor-pointer pl-12">
                                        {exchange.status ? (
                                            <div className="px-2 py-1 rounded-full bg-green-200 text-green-700">Active</div>
                                        ) : (
                                            <div className="px-2 py-1 rounded-full bg-red-200 text-red-700">Inactive</div>
                                        )}
                                    </td>
                                    <td className=" pl-16 px-7 2xl:px-0">
                                        <button
                                            onClick={() => handleEdit(exchange._id)}
                                            className=" p-3 bg-indigo-600  text-white rounded">
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(exchange._id)}
                                            className=" p-3 bg-indigo-700 ml-2 text-white rounded"
                                            style={{ backgroundColor: '#eb2121' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ExchangeList;
