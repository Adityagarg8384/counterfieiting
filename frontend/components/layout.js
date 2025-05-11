import React from 'react';
import Navbar from './Navbar/Navbar';

const Layout = ({ login, setLogin, name, setName }) => {
  return (
    <div className="max-h-screen w-full bg-white text-black overflow-x-hidden">
      <Navbar login={login} setLogin={setLogin} name={name} setName={setName} />
    </div>
  );
};

export default Layout;
