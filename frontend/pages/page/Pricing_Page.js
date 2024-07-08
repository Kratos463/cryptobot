import React from 'react';
import Header from '../../components/User_Components/Header';
import Pricing from '../../components/User_Components/Pricing';

function Pricing_Page() {
  return (
    <div style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}>
        <Header/>
        <Pricing/>
       
    </div>
  )
}

export default Pricing_Page
