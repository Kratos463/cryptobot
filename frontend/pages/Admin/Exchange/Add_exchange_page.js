import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import AddExchange from '../../../components/Admin_Components/ExchangeManagement/AddExchange';


function Add_exchange_page() {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <AddExchange/>
    </div>
  )
}

export default Add_exchange_page

