import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';



function Edit_Plan() {
    const router = useRouter();
    const { id } = router.query; 
    const [planName, setPlanName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('Monthly');
    const [features, setFeatures] = useState(['']);
    const [description, setDescription] = useState('');

    useEffect(() => {

        const fetchPlanDetails = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get_plan/${id}`);
                const { planName, price, duration, features, description } = response.data;
                setPlanName(planName);
                setPrice(price);
                setDuration(duration);
                setFeatures(features);
                setDescription(description);
            } catch (error) {
                console.error('Error fetching plan details:', error);
            }
        };

        if (id) {
            fetchPlanDetails();
        }
    }, [id]);
    
    const handleFeatureChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addFeature = () => {
        setFeatures([...features, '']);
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const planData = {
                planName,
                price,
                duration,
                features,
                description
            };
    
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update_plan/${id}`, planData);
            Swal.fire({
                
                icon: "success",
                title: "Updated plan successfully..",
                showConfirmButton: false,
                timer: 1500
            });
    
            
    
        } catch (error) {
            console.error('Error updating plan:', error);
            Swal.fire({
               
                icon: "error",
                title: "There was an error updating the plan",
                showConfirmButton: true,
                timer: 1500
            });
        }
    };

    function showDropDownMenuOne_form_layout_wizard3(el) {
        el.target.parentElement.children[1].classList.toggle("hidden");
    }

    function swaptextone_form_layout_wizard3(el) {
        const targetText = el.target.innerText;
        setDuration(targetText);
        document.getElementById("drop-down-content-setter-one_form_layout_wizard3").innerText = targetText;
        document.getElementById("drop-down-div-one_form_layout_wizard3").classList.toggle("hidden");
    }

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
                                            Edit Subscription Plan
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Plan Name
                                                </p>
                                                <input
                                                    type="text"
                                                    value={planName}
                                                    onChange={(e) => setPlanName(e.target.value)}
                                                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Price
                                                </p>
                                                <input
                                                    type="text"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Duration
                                                </p>
                                                <div className="relative top-1">
                                                    <div className="relative w-full border border-gray-300 rounded outline-none dropdown-one">
                                                        <button
                                                            type="button"
                                                            onClick={showDropDownMenuOne_form_layout_wizard3}
                                                            className="relative flex items-center justify-between w-full px-5 py-4"
                                                        >
                                                            <span
                                                                className="pr-4 text-sm font-medium text-gray-600"
                                                                id="drop-down-content-setter-one_form_layout_wizard3"
                                                            >
                                                                {duration}
                                                            </span>
                                                            <svg
                                                                id="rotate1"
                                                                className="absolute z-10 cursor-pointer right-5"
                                                                width={10}
                                                                height={6}
                                                                viewBox="0 0 10 6"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M0.5 0.75L5 5.25L9.5 0.75"
                                                                    stroke="#4B5563"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <div
                                                            className="absolute right-0 z-20 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12"
                                                            id="drop-down-div-one_form_layout_wizard3"
                                                        >
                                                            <p
                                                                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                                                                onClick={swaptextone_form_layout_wizard3}
                                                            >
                                                                Monthly
                                                            </p>
                                                            <p
                                                                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                                                                onClick={swaptextone_form_layout_wizard3}
                                                            >
                                                                Quarterly
                                                            </p>
                                                            <p
                                                                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                                                                onClick={swaptextone_form_layout_wizard3}
                                                            >
                                                                Half Yearly
                                                            </p>
                                                            <p
                                                                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                                                                onClick={swaptextone_form_layout_wizard3}
                                                            >
                                                                Annually
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Description
                                                </p>
                                                <input
                                                    type="text"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-gray-300 mt-2 px-7">
                                        <p className="text-base font-medium leading-4 text-gray-800">
                                            Plan Features
                                        </p>
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex items-center mt-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="mt- p-3 bg-indigo-700 ml-2 text-white rounded"
                                                    style={{ backgroundColor: '#eb2121' }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="mt-2 p-3 bg-indigo-700 text-white rounded"
                                            style={{ backgroundColor: '#0086c9' }}
                                        >
                                            Add Feature
                                        </button>
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
                                            Update Plan
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

export default Edit_Plan;
