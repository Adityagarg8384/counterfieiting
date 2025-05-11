import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import ProductFactory from '../artifacts/contracts/Campaigns.sol/ProductFactory';
import { ethers } from 'ethers';
import Link from 'next/link';

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
        <div className="flex flex-col items-center justify-center bg-[#191b21] rounded-lg p-5 shadow-lg w-[90vw] md:w-[60vw]">
            <form onSubmit={startcampaign} className="w-full">
                <h1 className="text-white text-base md:text-xl mb-5">Add Details</h1>
                <div className="flex flex-col mb-4">
                    <label className="text-white text-sm mb-1" htmlFor="productName">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={data.productName || ""}
                        onChange={FormHandler}
                        className="p-2 w-full rounded-md text-sm bg-[#212631] text-white border-none"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-white text-sm mb-1" htmlFor="productCompany">
                        Product Company:
                    </label>
                    <input
                        type="text"
                        id="productCompany"
                        name="productCompany"
                        value={data.productCompany || ""}
                        onChange={FormHandler}
                        className="p-2 w-full rounded-md text-sm bg-[#212631] text-white border-none"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-white text-sm mb-1" htmlFor="productImageUri">
                        Product Image:
                    </label>
                    <input
                        type="text"
                        id="productImageUri"
                        name="productImageUri"
                        value={data.productImageUri || ""}
                        onChange={FormHandler}
                        className="p-2 w-full rounded-md text-sm bg-[#212631] text-white border-none"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-white text-sm mb-1" htmlFor="productCategory">
                        Product Category:
                    </label>
                    <input
                        type="text"
                        id="productCategory"
                        name="productCategory"
                        value={data.productCategory || ""}
                        onChange={FormHandler}
                        className="p-2 w-full rounded-md text-sm bg-[#212631] text-white border-none"
                    />
                </div>
                <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer text-base md:text-lg">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Form;

