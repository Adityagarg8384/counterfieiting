import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import ProductFactory from '../artifacts/contracts/Campaigns.sol/ProductFactory';
import { ethers } from 'ethers';
import Link from 'next/link';


const Text = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 20px;

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 12px; /* Adjusted font size for smaller screens */
  }
`;

const Head1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #191b21;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90vw; /* Adjusted width for smaller screens */

  @media (min-width: 768px) {
    width: 60vw; /* Adjusted width for desktop screens */
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputName = styled.div`
  color: white;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: #212631;
  color: white;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 18px; /* Adjusted font size for desktop screens */
  }
`;

const Form = () => {
    

    const [data, setData] = useState([]);
    const [found, setFound] = useState(false);

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
            provider
        )
        

        const getFile = contract.filters.productcreated(null, null, null, null, address);
        
        const dataFile = await contract.queryFilter(getFile);
        

        const Alldata = dataFile.map((e) => {
            return {
                productName: e.args.productname,
                productCompany: e.args.productcompany,
                productImageUri: e.args.imageuri,
                productCategory: e.args.productcategory,
                productAddress: e.args.productaddress,
            }
        })
        
        setData(Alldata);
        setFound(true);
    }

    const startcampaign = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        

        if (data.productName === "") {

        }
        else {
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_ADDRESS,
                ProductFactory.abi,
                signer
            )
           

            try {
                const campaignData = await contract.createproduct(
                    data.productName,
                    data.productCompany,
                    data.productImageUri,
                    data.productCategory,
                );

                await campaignData.wait();

            }
            catch (err) {
                console.log(err);
            }

        }
    }

    const FormHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Head1>
            <form onSubmit={startcampaign}>
                <Text>Add Details</Text>
                <InputWrapper>
                    <InputName>Product Name:</InputName>
                    <Input
                        type="text"
                        name="productName"
                        value={data.productName}
                        onChange={FormHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputName>Product Company:</InputName>
                    <Input
                        type="text"
                        name="productCompany"
                        value={data.productCompany}
                        onChange={FormHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputName>Product Image:</InputName>
                    <Input
                        type="text"
                        name="productImageUri"
                        value={data.productImageUri}
                        onChange={FormHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputName>Product Category:</InputName>
                    <Input
                        type="text"
                        name="productCategory"
                        value={data.productCategory}
                        onChange={FormHandler}
                    />
                </InputWrapper>
                <Button type="submit">Submit</Button>
            </form>
        </Head1>
    )
}

export default Form;

           