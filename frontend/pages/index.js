import React from 'react'
import Form from "../components/form";
import styled from 'styled-components';
import FrontPage from '@/components/frontpage';

const index = () => {
  return (
    <Div>
      <FrontPage/>
    </Div>
  )
}

const Div= styled.div`
background-color: #25273d;
height: 100vh;
`

export default index;

