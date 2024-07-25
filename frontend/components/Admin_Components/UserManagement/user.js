import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { MdVerified } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";




function user() {
    const [users, setUsers] = useState([]);
    const [blocked, setBlocked] = useState(false);


    const router = useRouter();

    // -----------Fetching data from backend to list the Users---------------

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`);
                setUsers(response.data.userData);
                console.log(response.data.userData)

            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, [users]);

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
                console.log('Plan deleted:', response.data.userData);

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

    // -------------Status updation --------------------

    const handleStatusToggle = async (planId) => {
        console.log(planId)
        try {
            const planToUpdate = plans.find(plan => plan._id === planId);
            const newStatus = !planToUpdate.status;
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update_plan_status/${planId}`, { status: newStatus });
            setPlans(plans.map(plan => {
                if (plan._id === planId) {
                    return { ...plan, status: newStatus };
                }
                return plan;
            }));
        } catch (error) {
            console.error('Failed to update plan status:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update the plan status. Please try again later.",
                icon: "error"
            });
        }
    };

    // -------------- Handle user Block ---------------

    const handleBlock = async (userId) => {
        const userToUpdate = users.find((user) => user._id === userId);
        const newStatus = !userToUpdate.isBlock;

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to ${newStatus ? 'block' : 'unblock'} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/block_user/${userId}`, { isBlock: newStatus });
                setUsers(users.map((user) => {
                    if (user._id === userId) {
                        return { ...user, isBlock: newStatus };
                    }
                    return user;
                }));
                Swal.fire({
                    title: 'Updated!',
                    text: `User has been ${newStatus ? 'blocked' : 'unblocked'}.`,
                    icon: 'success',
                });
            } catch (error) {
                console.error('Failed to update user status:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update the user status. Please try again later.',
                    icon: 'error',
                });
            }
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
            <div className="w-70 sm:px-6 mt-4 overflow-y-auto">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Users</p>
                        <div className="mr-9">
                            {/* <Link href='/Admin/SubcriptionManagement/Addplan_Page'>
                                <button className="inline-flex sm:ml-2 mt-4 sm:mt-0 items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" style={{ backgroundColor: '#0086c9' }}>
                                    <p className="text-sm font-medium leading-none text-white">+ Add Plan</p>
                                </button>
                            </Link> */}
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-semibold text-left pl-2">User Id</th>
                                <th className="font-semibold text-left pl-8">Name</th>
                                <th className="font-semibold text-left pl-8">Email</th>
                                <th className="font-semibold text-left pl-12">Email verified</th>
                                <th className="font-semibold text-left pl-12">2FA </th>
                                <th className="font-semibold text-left pl-12">Status </th>
                                <th className="font-semibold text-left pl-12">Bots</th>
                                <th className="font-semibold text-left pl-12">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {users.map(user => (
                                <tr key={user._id} className="h-20 text-sm leading-none text-gray-800 border-b border-t bg-white hover:bg-gray-100 border-gray-100">
                                    <td className="pl-2 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="">
                                                <p className="font-medium">{user._id.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="pl-8 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="">
                                                <p className="font-medium">{user.fullname}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">{user.email}</p>
                                    </td>
                                    <td className="pl-16">
                                        <p className="font-4xl">
                                            {user.emailVerified ? (
                                                <MdVerified style={{ color: 'green' }} />
                                            ) : (
                                                <IoCloseCircle style={{ color: 'red' }} />
                                            )}
                                        </p>
                                    </td>
                                    <td className="pl-12">

                                    </td>

                                    <td onClick={() => handleStatusToggle(user._id)} className="cursor-pointer pl-12">
                                        {user.isActive ? (
                                            <div className="px-2 py-1 rounded-full bg-green-200 text-green-700">Active</div>
                                        ) : (
                                            <div className="px-2 py-1 rounded-full bg-red-200 text-red-700">Inactive</div>
                                        )}
                                    </td>
                                    <td className="pl-12">

                                    </td>

                                    <td className="px-7 2xl:px-0">
                                        <button
                                            onClick={() => handleEdit(user._id)}
                                            className=" p-3 bg-indigo-600  text-white rounded">
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleBlock(user._id)}
                                            className="p-3 ml-2 text-white rounded"
                                            style={{ backgroundColor: user.isBlock ? '#eb2121' : '#FFA500' }}
                                        >
                                            {user.isBlock ? 'Unblock' : 'Block'}
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

export default user;
