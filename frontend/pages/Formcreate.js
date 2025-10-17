import React from 'react'
import Form from '@/components/form';
import Layout from '@/components/layout';
import styled from 'styled-components';
import Navbar2 from '@/components/navbar2';

const Formcreate = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#14161a]">
      <Navbar2 />
      <Form />
    </div>
  )
}

export default Formcreate;
