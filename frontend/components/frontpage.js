import React from 'react'
import styled from 'styled-components';
import picture from "../public/png.png"
import Image from 'next/image';
import Link from 'next/link';

function FrontPage() {
  return (
    <Head>
        <Main>
            <Head1>
            Experience uncertainty regarding the authenticity of your product?
            </Head1>
            <Subhead>
            Rely on our professional services to confirm the originality of your goods with confidence.
            </Subhead>
            <Link href="/getdata">
            <But>
                Get Started
            </But>
            </Link>
        </Main>
        <Head2>
           
            <CustomImage src={picture} width={500} height={1000}></CustomImage>
            
        </Head2>
    </Head>
  )
}

const Head = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-start;
  align-items: center;
  max-width: 50%;
  // margin-top: 80px;

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    max-width: 90%; /* Adjust maximum width for smaller screens */
  }
`;

const Head1 = styled.div`
  font-size: 4rem;
  margin-top: 2rem;
  color: white;
  line-height: 1;
  margin-left: 6rem;

  @media only screen and (max-width: 431px) and (max-height: 933px) {
    font-size: 3rem; /* Adjust font size for smaller screens */
    margin-top: 2rem; /* Adjust margin top for smaller screens */
    margin-left: 6rem;
  }
`;

const Subhead = styled.p`
  margin-top: 4rem;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 40px;
  margin-left: 6rem;

  @media only screen and (max-width: 431px) and (max-height: 933px) {
    font-size: 1rem; /* Adjust font size for smaller screens */
    margin-top: 4rem; /* Adjust margin top for smaller screens */
    margin-bottom: 20px; /* Adjust margin bottom for smaller screens */
    margin-left: 2rem;
  }
`;

const But = styled.button`
  border-radius: 5vh;
  background-color: #e5f243;
  // height: 6vh;
  // width: 8vw;
  padding: 1vh;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5vh;
  border: none;
  cursor: pointer;

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    width: 40vw; /* Adjust width for smaller screens */
    height: 5vh; /* Adjust height for smaller screens */
    font-size: 14px; /* Adjust font size for smaller screens */
  }
`;

const Head2 = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomImage = styled(Image)`
  width: 40vw; /* Auto width */
  height: 70%;

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    width: 80vw; /* Adjust width for smaller screens */
    height: 50%; /* Adjust height for smaller screens */
  }
`;

export default FrontPage;