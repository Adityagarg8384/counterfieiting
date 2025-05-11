import React from 'react'
import '../../styles/Home.module.css'
import styled from 'styled-components'
import Link from 'next/link'

const Navbar = ({ login, setLogin, name, setName }) => {
  const change = () => {
    setLogin();
  }

  return (

    <header className="bg-[#25273d] text-white py-5">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <h1 className="text-[1.2rem]">Anti-Counterfieting</h1>
        <nav className="text-base max-[431px]:text-sm">
          <ul className="flex list-none p-0 m-0">
            <li className="flex items-center ml-4 md:ml-8">
              <Link href="/" className="transition-colors hover:text-[#f9cc41]">
                Home
              </Link>
            </li>
            <li className="flex items-center ml-4 md:ml-8">
              <Link href="/getdata" className="transition-colors hover:text-[#f9cc41]">
                Get Data
              </Link>
            </li>
            <li className="flex items-center ml-4 md:ml-8">
              <Link href="/Formcreate" className="transition-colors hover:text-[#f9cc41]">
                Add Product
              </Link>
            </li>
            <li className="flex items-center ml-4 md:ml-8">
              <Link href="/verify" className="transition-colors hover:text-[#f9cc41]">
                Verify Product
              </Link>
            </li>
            <li className="flex items-center ml-4 md:ml-8">
              <Link href="/login">
                <button
                  onClick={change}
                  className="bg-[#e5f243] text-black rounded-[5vh] py-[1vh] px-4 max-w-[50%] mt-2 md:mt-0"
                >
                  {name}
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
