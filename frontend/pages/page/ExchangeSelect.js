import React from 'react';
import withAuth from '../../HOC/withAuth';
import Header from '../../components/User_Components/Header';
import ExchangeSelection from '../../components/User_Components/ExchangeSelection';

function ExchangeSelect() {
  return (
    <div style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}>
      <Header/>
      <ExchangeSelection/>
    </div>
  )
}

export default withAuth(ExchangeSelect)
