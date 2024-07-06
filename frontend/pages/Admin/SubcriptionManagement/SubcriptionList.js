import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import Subcription from '../../../components/Admin_Components/SubcriptionManagement/Subcription';

function SubcriptionList() {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <Subcription/>
    </div> 
  )
}

export default SubcriptionList
