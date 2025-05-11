import React from 'react'
import styled from 'styled-components';
import picture from "../public/png.png"
import Image from 'next/image';
import Link from 'next/link';

function FrontPage() {
  return (
    <div className="flex justify-around items-center flex-col md:flex-row">
      {/* Left Section */}
      <div className="h-screen flex flex-col justify-start items-center max-w-[90%] md:max-w-[50%]">
        <div className="mt-8 ml-24 text-white leading-none text-[3rem] md:text-[4rem]">
          Experience uncertainty regarding the authenticity of your product?
        </div>
        <p className="mt-16 ml-8 md:ml-24 text-white text-[1rem] md:text-[1.5rem] mb-5 md:mb-10">
          Rely on our professional services to confirm the originality of your goods with confidence.
        </p>
        <Link href="/getdata">
          <button className="bg-[#e5f243] rounded-[5vh] p-[1vh] text-black inline-block border-none cursor-pointer w-[40vw] h-[5vh] text-[14px] md:w-auto md:h-auto md:text-base">
            Get Started
          </button>
        </Link>
      </div>
      {/* Right Section */}
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <Image 
          src={picture} 
          width={500} 
          height={1000} 
          alt="Picture"
          className="w-[40vw] h-[70%] sm:w-[80vw] sm:h-[50%]"
        />
      </div>
    </div>
  )
}

export default FrontPage;