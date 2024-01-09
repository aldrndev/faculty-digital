import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePage;
