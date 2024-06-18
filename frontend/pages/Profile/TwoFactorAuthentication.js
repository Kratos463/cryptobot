import React from 'react';
import Enable2FA from '../../components/User_Components/Enable2FA';
import Header from '../../components/User_Components/Header';
import ProfileSidebar from '../../components/User_Components/ProfileSidebar';

function TwoFactorAuthentication() {
  return (
    <>
            <Header />
            
            <div className=" profile-container pt-16" style={{ backgroundColor: '#040429' }}>
                <div className="w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
                    <ProfileSidebar />
                    <main className="w-full min-h-screen py-1 pt-8 md:w-2/3 lg:w-3/4">
                        <Enable2FA />
                    </main>
                </div>
            </div>
        </>
  )
}

export default TwoFactorAuthentication
