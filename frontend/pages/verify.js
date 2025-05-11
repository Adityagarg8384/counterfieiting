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
    <div className="flex flex-col justify-start items-center h-screen bg-[#14161a]">
    <h1 className="text-white text-[6vw] md:text-3xl mb-[5vh]">Verify</h1>
    <div className="flex justify-center items-center">
      <h1 className="text-base text-white mr-[1vw]">Enter Product Name :</h1>
      <input
        onChange={formhandler}
        value={product}
        placeholder="productname"
        className="p-2 w-[70vw] md:w-[20vw] border-0 rounded-[5px] text-base bg-[#212631] text-white"
      />
      <button
        onClick={getdata}
        className="ml-2 bg-[#f44336] text-white py-2 px-5 border-0 rounded-[5px] cursor-pointer text-base font-bold transition-colors duration-300 hover:bg-[#d32f2f] focus:outline-none"
      >
        Getdata
      </button>
    </div>
    {found ? (
      <div className="flex justify-center items-center mt-[20vh]">
        <h1 className="text-base text-white mr-[1vw]">Enter Hash :</h1>
        <input
          placeholder="Hashcode"
          value={hash}
          onChange={formnewhandler}
          className="p-2 w-[70vw] md:w-[20vw] border-0 rounded-[5px] text-base bg-[#212631] text-white"
        />
        <button
          onClick={Verifytask}
          className="ml-2 py-2 px-5 bg-[#007bff] text-white border-0 rounded-[5px] cursor-pointer text-base transition-colors duration-300 hover:bg-[#0056b3] focus:outline-none w-[50vw] md:w-auto"
        >
          VerifyTask
        </button>
      </div>
    ) : (
      <div></div>
    )}
  </div>
  )
}

export default verify;