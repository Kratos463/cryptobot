import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import Edit_Plan from '../../../components/Admin_Components/SubcriptionManagement/Edit_Plan';

function Editplan_page() {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <Edit_Plan />
        </div>
    )
}

export default Editplan_page
