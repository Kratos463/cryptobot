import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import Add_Plan from '../../../components/Admin_Components/SubcriptionManagement/Add_Plan';


function Addplan_Page() {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <Add_Plan/>
    </div>
  )
}

export default Addplan_Page
