
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/Admin/Login');
  }, []);

  return <div>Redirecting to Admin Login...</div>;
}

export default AdminPage;
