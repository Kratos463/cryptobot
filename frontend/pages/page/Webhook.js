import React from 'react';
import withAuth from "../../HOC/withAuth";
import GetWebhookurl from '../../components/User_Components/GetWebhookurl';
import Header from '../../components/User_Components/Header'

function Webhook() {
  return (
    <div style={{
        backgroundImage: `url('/Assets/loginimage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
      }}>
         <Header/>
      <GetWebhookurl/>
     
    </div>
  )
}

export default withAuth(Webhook)
