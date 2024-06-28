import React from 'react';
import withAuth from '../../HOC/withAuth';
import Header from '../../components/User_Components/Header';
import BotList from '../../components/User_Components/BotList';

function Mybots() {
  return (
    <div style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}>
        <Header/>
        <BotList/>
      
    </div>
  )
}

export default withAuth(Mybots)
