import React from 'react'
import '../../styles/Home.module.css'
import styled from 'styled-components'
import Link from 'next/link'

const Navbar = ({login,setLogin, name, setName}) => {
  const change=()=>{
    setLogin();
  }

  return (

  <Header>
        <ContentWrapper>
          <Logo>Anti-Counterfieting</Logo>
          <Nav>
            <ul>
              <li><Link href='/'><div>Home</div></Link></li>
              <li><Link href='/getdata'><div>Get Data</div></Link></li>
              <li><Link href='/Formcreate'><div>Add Product</div></Link></li>
              <li><Link href='/verify'><div>Verify Product</div></Link></li>
              <li><Link href='/login'><Button onClick={change}>{name}</Button></Link></li>

            </ul>
          </Nav>
        </ContentWrapper>
      </Header>
  )
}
const Header = styled.header`
  background-color: #25273d;
  color: #ffffff;
  padding: 20px 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.2rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
    @media (max-width: 431px) and (max-height: 933px) {
      margin-left: 1rem;
    }
  }

  a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #f9cc41;
    }
  }
  @media (max-width: 431px) and (max-height: 933px) {
    font-size: 0.8rem;
  }
`;

const Head1 = styled.div`
  width: 100%;
  height: 70px;
  border: 2px red solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blue;

  @media (max-width: 430px) and (max-height: 932px) {
    height: auto; /* Adjust height for smaller screens */
    flex-direction: column; /* Stack elements vertically */
    justify-content: center; /* Align items vertically */
    padding: 20px; /* Add some padding */
  }
`;

const Button = styled.button`
  border-radius: 5vh;
  background-color: #e5f243;
  // height: 6vh;
  // width: 8vw;
  padding: 1vh;
  color: black;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 50%; /* Adjust button width for smaller screens */
    margin-top: 10px; /* Add some margin to separate elements */
  }
`;

export default Navbar;
