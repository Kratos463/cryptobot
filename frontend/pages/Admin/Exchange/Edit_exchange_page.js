import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import EditExchange from '../../../components/Admin_Components/ExchangeManagement/EditExchange';

function Edit_exchange_page() {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <EditExchange/>
        </div>
    )
}

export default Edit_exchange_page

