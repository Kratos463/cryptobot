import React from 'react';
import withAuth from '../../HOC/withAuth';
import Header from '../../components/User_Components/Header';

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}
    >
      <Header />
     
    </div>
  );
}

export default withAuth(Home);
