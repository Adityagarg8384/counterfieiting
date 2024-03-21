import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const RightNavbar = () => {
  return (
    <Head>
        <Link passHref href={'/'}>
            <NavEle >Home</NavEle>
          </Link>
          <Link href={'/getdata'}>
            <NavEle >Get Product</NavEle>
          </Link>
          <Link href={'/Formcreate'}>
            <NavEle >Add Product</NavEle>
          </Link>
          <Link href={'/verify'}>
            <NavEle >Verify Product</NavEle>
          </Link>
    </Head>
  )
}

const Head= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 5px;
`
const NavEle= styled.li`
margin: 10px;
color: white;
list-style: none;
text-decoration: none;

 &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`

export default RightNavbar;
