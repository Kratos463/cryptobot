import React from 'react';
import withAuth from '../../HOC/withAuth';
import Header from '../../components/User_Components/Header';
import CreateBot from '../../components/User_Components/CreateBot'

function BotCreation() {
  return (
    <div style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}>
      <Header/>
      <CreateBot/>
      
    </div>
  )
}

export default withAuth(BotCreation);
