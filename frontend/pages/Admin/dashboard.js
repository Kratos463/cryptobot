import React from 'react';
import Sidebar from '../../components/Admin_Components/Sidebar';
import Subcription from '../../components/Admin_Components/SubcriptionManagement/Subcription';
import Add_Plan from '../../components/Admin_Components/SubcriptionManagement/Add_Plan';
import Dashboard from '../../components/Admin_Components/dashboard';

function dashboard() {
  return (
    <div className=' flex h-screen'>
      <Sidebar/>
      <Dashboard/>
      {/* <Subcription/> */}
      {/* <Add_Plan/> */}
      
    </div>
  )
}

export default dashboard
