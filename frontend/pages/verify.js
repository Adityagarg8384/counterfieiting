import React, { useState } from 'react'
import styled from 'styled-components';
import { ethers } from 'ethers';
import ProductFactory from "../artifacts/contracts/Campaigns.sol/ProductFactory"
import Product from "../artifacts/contracts/Campaigns.sol/Product"

const verify = () => {
  const [product, setProduct] = useState();
  const [address, setAddress] = useState();
  const [hash, setHash] = useState();
  const [found, setFound] = useState();

  const formhandler = (e) => {
    setProduct(e.target.value);
  }

  const getdata = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3provider.getSigner();
    const address = await signer.getAddress();

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL,
    )

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ADDRESS,
      ProductFactory.abi,
      provider,
    )

    const getFile = contract.filters.productcreated(product);
    const dataFile = await contract.queryFilter(getFile);
    setAddress(dataFile[0].args.productaddress);
    setFound(true);
  }

  const Verifytask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3provider.getSigner();


      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL,
      )

      const contract = new ethers.Contract(
        address,
        Product.abi,
        signer
      )

      const getFile = contract.verifyproduct(product, hash);
      await getFile.then(() => {
      }).catch((err) => {
        console.log(err);
        alert("Product is duplicate")
      });
    }
    catch (err) {
      console.log(err);
      
    }
   
  }

  const getNewdata = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3provider.getSigner();

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL,
    )

    const contract = new ethers.Contract(
      address,
      Product.abi,
      signer
    )
    const getFile = contract.filters.verifyproductsuccess();
    const addFile = await contract.queryFilter(getFile);
  }
  const formnewhandler = (e) => {
    setHash(e.target.value);
  }

  return (
    <div>
      <Head>
        <Text>Verify</Text>
      <Head2>
        <Text2>Enter Product Name : </Text2>
      <Input onChange={formhandler} value={product} placeholder="productname"></Input>
      <RedButton onClick={getdata}>Getdata</RedButton>
      </Head2>
      
      {
        found === true ?
          <Head3>
            <Text2>Enter Hash : </Text2>
            <Input placeholder="Hashcode" value={hash} onChange={formnewhandler}></Input>
            <BlueButton onClick={Verifytask}>VerifyTask</BlueButton>
          </Head3> :
          <div></div>
      }
      </Head>
    </div>

  )
}

const Head = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-start;
  align-items: center;
  height: 100vh;
  background-color: #14161a;
`;

const Head2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Head3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
`;

const Text = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 5vh;

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    font-size: 6vw; /* Adjust font size for smaller screens */
  }
`;

const Text2 = styled.h1`
  font-size: 1rem;
  color: white;
  margin-right: 1vw;
`;

const Input = styled.input`
  padding: 10px;
  width: 20vw;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #212631;
  color: white;

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    width: 70vw; /* Adjust input width for smaller screens */
  }
`;

const RedButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }
`;

const BlueButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  // width: 10vw;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 430px) and (max-height: 932px) {
    width: 50vw; /* Adjust button width for smaller screens */
  }
`;

export default verify;