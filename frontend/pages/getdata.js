import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ethers from 'ethers';
import ProductFactory from '../artifacts/contracts/Campaigns.sol/ProductFactory';
import Product from '../artifacts/contracts/Campaigns.sol/Product';
import Link from 'next/link';

const getdata = () => {

    const [data, setData] = useState([]);
    const [found, setFound] = useState(false);
    const [load, setLoad] = useState(false);

    const get = async () => {
        setLoad(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3provider.getSigner();
        const address = await signer.getAddress();

        const provider = new ethers.providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_RPC_URL,
        );

        const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_ADDRESS,
            ProductFactory.abi,
            provider
        );

        const getFile = contract.filters.productcreated(null, null, null, null, address);
        const dataFile = await contract.queryFilter(getFile);

        const allData = await Promise.all(dataFile.map(async (e) => {
            const provide = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL
            );

            const contrac = new ethers.Contract(
                e.args.productaddress,
                Product.abi,
                provide
            );

            const productName = await contrac.ProductName();

            return {
                productName,
                productCompany: e.args.productcompany,
                productImageUri: e.args.imageuri,
                productCategory: e.args.productcategory,
                productAddress: e.args.productaddress,
            };
        }));


        setData(allData);
        setFound(true);
        setLoad(false);
    }

    return (
        <div className="w-full h-full flex justify-center items-baseline">
            <div className="mt-2 w-[90%] inline-block border border-black rounded-md md:w-[60%]">
                <div className="flex flex-col justify-center">
                    <button
                        onClick={get}
                        className="my-10 mx-auto mb-5 block w-[40%] py-2 px-5 text-sm font-bold text-center bg-green-500 text-white border-2 border-green-500 rounded cursor-pointer hover:bg-green-600 active:bg-green-700 md:w-[20%]"
                    >
                        {load && <i className="fa fa-refresh fa-spin"></i>}
                        <span>Get data</span>
                    </button>
                    <div>
                        {!found ? (
                            <h2 className="text-center">Click the button to get data</h2>
                        ) : (
                            <div>
                                {data.map((e, index) => (
                                    <Link key={index} href={'/' + e.productAddress} passHref>
                                        <div className="bg-gray-200 m-1 p-2 cursor-pointer">
                                            <h3 className="text-base flex items-center justify-between font-bold">
                                                Product: {e.productName}
                                            </h3>
                                            <p>Product Company: {e.productCompany}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default getdata;
