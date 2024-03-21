import React from 'react'
import Form from '@/components/form';
import Layout from '@/components/layout';
import styled from 'styled-components';

const Formcreate = () => {
  return (
    <Container>
      <Form/>
    </Container>
    
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #14161a; /* Background color */
`;
export default Formcreate;
