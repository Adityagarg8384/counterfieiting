import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const RightNavbar = () => {
  return (
    <div className="flex justify-between items-center m-1">
      <Link href="/" passHref>
        <a className="mx-2 text-white no-underline hover:bg-gray-300 cursor-pointer">
          Home
        </a>
      </Link>
      <Link href="/getdata" passHref>
        <a className="mx-2 text-white no-underline hover:bg-gray-300 cursor-pointer">
          Get Product
        </a>
      </Link>
      <Link href="/Formcreate" passHref>
        <a className="mx-2 text-white no-underline hover:bg-gray-300 cursor-pointer">
          Add Product
        </a>
      </Link>
      <Link href="/verify" passHref>
        <a className="mx-2 text-white no-underline hover:bg-gray-300 cursor-pointer">
          Verify Product
        </a>
      </Link>
    </div>

  )
}

export default RightNavbar;
