import React from 'react';
import NavBar from '../components/NavBar';
import { Footer } from '../components';

const DashboardAdmin = () => {
  return (
    <div className='h-screen w-full relative'>
      <NavBar message='Logout' />
      <h1 className='text-2xl font-bold text-center'>Dashboard Admin</h1>
      <Footer />
    </div>
  );
};

export default DashboardAdmin;
