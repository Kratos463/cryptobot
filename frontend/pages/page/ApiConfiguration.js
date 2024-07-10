import React from 'react';
import withAuth from '../../HOC/withAuth';
import Header from '../../components/User_Components/Header';
import Apiconfig from '../../components/User_Components/apiconfig';

function ApiConfiguration() {
  return (
    <div style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}>
        <Header/>
        <Apiconfig/>
      
    </div>
  )
}

export default withAuth(ApiConfiguration)
