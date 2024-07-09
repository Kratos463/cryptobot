import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import ExchangeList from '../../../components/Admin_Components/ExchangeManagement/ExchangeList';

function Exchange_page() {
  return (
   < div className='flex h-screen'>
      <Sidebar/>
      <ExchangeList/>
    </div> 
  )
}

export default Exchange_page

