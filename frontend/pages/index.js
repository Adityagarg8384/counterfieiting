import React from 'react'
import Form from "../components/form";
import styled from 'styled-components';
import FrontPage from '@/components/frontpage';

const index = () => {
  return (
    <div className="bg-[#25273d] h-screen">
      <FrontPage />
    </div>
  )
}

const Div= styled.div`
background-color: #25273d;
height: 100vh;
`

export default index;

