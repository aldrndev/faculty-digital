import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
    Swal.fire({
      title: 'Success',
      text: 'Logout successfully',
      icon: 'success',
    });
  };
  return (
    <div className="w-64 min-h-full fixed shadow-xl">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-gray-800 text-2xl mt-5 mb-3">Welcome Back</h1>
        <div className="mb-1">
          <img
            src="https://img.freepik.com/free-vector/cute-man-working-laptop-with-coffee-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3869.jpg"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <h2 className="text-gray-600 text-lg mt-2">{name}</h2>
      </div>
      <hr className="divided-y mt-5" />
      <div className="p-5 mt-3">
        <Link to="/dashboard">
          <div className="flex gap-2 items-center ml-4 hover:bg-gray-200 p-3 mb-4">
            <MdDashboard size={20} /> Dashboard
          </div>
        </Link>
        <Link to="#" onClick={() => logoutHandler()}>
          <div className="flex gap-2 items-center ml-4 hover:bg-gray-200 p-3">
            <IoIosLogOut size={20} /> Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
