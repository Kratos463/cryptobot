import React from 'react'
import withAuth from '../../HOC/withAuth';
import Header from '../../components/User_Components/Header';


function Home() {
  return (
    <>
    <Header/>
    </>
  )
}

export default withAuth(Home);

