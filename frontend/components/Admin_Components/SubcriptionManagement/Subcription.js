import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';


function Subcription() {
    const [plans, setPlans] = useState([]);
    const router = useRouter();

    // -----------Fetching data from backend to list the subcription plans---------------

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/fetch_subcriptionPlans`);
                setPlans(response.data.plans);
                console.log(response);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, [plans]);

    // -------------Redirect to edit page to edit the subcription plan --------------

    const handleEdit = (planId) => {

        router.push({
            pathname: '/Admin/SubcriptionManagement/Editplan_page',
            query: { id: planId },
        });
        console.log(`Editing plan with ID: ${planId}`);
    };

    // -------------Deletion of subcription plan-----------------

    const handleDelete = async (planId) => {

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
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete_plan/${planId}`);
                console.log('Plan deleted:', response.data);

                Swal.fire({
                    title: "Deleted!",
                    text: "Your plan has been deleted.",
                    icon: "success"
                });


            }

        } catch (error) {
            console.error('Error deleting plan:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete the plan. Please try again later.",
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
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Subscriptions</p>
                        <div className="mr-9">
                            <Link href='/Admin/SubcriptionManagement/Addplan_Page'>
                                <button className="inline-flex sm:ml-2 mt-4 sm:mt-0 items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" style={{ backgroundColor: '#0086c9' }}>
                                    <p className="text-sm font-medium leading-none text-white">+ Add Plan</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-semibold text-left pl-2">Plan Name</th>
                                <th className="font-semibold text-left pl-8">Price</th>
                                <th className="font-semibold text-left pl-8">Duration</th>
                                <th className="font-semibold text-left pl-12">Features</th>
                                <th className="font-semibold text-left pl-12">Status</th>
                                <th className="font-semibold text-left pl-12">Description</th>
                                <th className="font-semibold text-left pl-12">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {plans.map(plan => (
                                <tr key={plan._id} className="h-20 text-sm leading-none text-gray-800 border-b border-t bg-white hover:bg-gray-100 border-gray-100">
                                    <td className="pl-4 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="">
                                                <p className="font-medium">{plan.planName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">${plan.price}</p>
                                    </td>
                                    <td className="pl-8">
                                        <p className="font-medium">
                                            {plan.duration}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        {plan.features.map((feature, index) => (
                                            <p key={index} className="font-medium">{feature}</p>
                                        ))}
                                    </td>
                                    <td className="pl-12">
                                        {plan.status === "active" ? (
                                            <div className="px-2 py-1 rounded-full bg-green-200 text-green-700">Active</div>
                                        ) : (
                                            <div className="px-2 py-1 rounded-full bg-red-200 text-red-700  ">Inactive</div>
                                        )}
                                    </td>
                                    <td className="pl-12">
                                        <div
                                            className="flex items-center"
                                            style={descriptionStyle}
                                            onMouseEnter={() => {
                                                document.getElementById(`full-desc-${plan._id}`).style.display = 'block';
                                            }}
                                            onMouseLeave={() => {
                                                document.getElementById(`full-desc-${plan._id}`).style.display = 'none';
                                            }}
                                        >
                                            <p className="font-medium">{truncateDescription(plan.description)}</p>
                                            <span
                                                id={`full-desc-${plan._id}`}
                                                style={{ ...fullDescriptionStyle }}
                                            >
                                                {plan.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-7 2xl:px-0">
                                        <button
                                            onClick={() => handleEdit(plan._id)}
                                            className=" p-3 bg-indigo-600  text-white rounded">
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(plan._id)}
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

export default Subcription;
