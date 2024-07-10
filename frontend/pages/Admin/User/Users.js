import React from 'react';
import Sidebar from '../../../components/Admin_Components/Sidebar';
import User from '../../../components/Admin_Components/UserManagement/user';

function Users() {
  return (
    <div className='flex h-screen'>
        <Sidebar/>
        <User/>
      
    </div>
  )
}

export default Users
