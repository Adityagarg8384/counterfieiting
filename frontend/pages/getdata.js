import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ethers from 'ethers';
import ProductFactory from '../artifacts/contracts/Campaigns.sol/ProductFactory';
import Product from '../artifacts/contracts/Campaigns.sol/Product';
import Link from 'next/link';

const getdata = () => {

    const [data, setData] = useState([]);
    const [found, setFound] = useState(false);
    const [load, setLoad]= useState(false);

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
        <Head1>
            <Head2>
                <Head3>
                    <Button onClick={get}>
                        {load && <i className='fa fa-refresh fa-spin'></i>}
                        
                        <h>Get data</h>
                        </Button>
                    <div>
                        {
                            found === false ?
                                <h2>Click the button to get data</h2>
                                :
                                <div>
                                    {data.map((e, index) => (
                                        <Link key={index} passHref href={'/' + e.productAddress}>
                                            <Task >
                                                <H3 >Product :   {e.productName}  </H3>
                                                <p>Product Company:   {e.productCompany}</p>
                                            </Task>
                                        </Link>
                                    ))}
                                </div>
                        }
                    </div>
                </Head3>
            </Head2>
        </Head1>
    );
}

const Head1 = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: baseline;
`;

const Head2 = styled.div`
    margin-top: 10px;
    width: 90%;
    display: inline-block;
    border: 0.5px solid black;
    border-radius: 8px;

    @media (min-width: 768px) {
        width: 60%; /* Adjust width for desktop */
    }
`;

const Head3 = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Button = styled.button`
    margin: 10% auto 5%;
    display: block;
    height: 10%;
    width: 40%;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    background-color: #4CAF50; /* Green */
    color: white;
    border: 2px solid #4CAF50;
    border-radius: 5px;
    cursor: pointer;

    :hover {
        background-color: #45a049; 
    }

    :active {
        background-color: #3e8e41;
        border-color: #3e8e41;
    }

    @media (min-width: 768px) {
        width: 20%; /* Adjust width for desktop */
    }
`;

const Task = styled.div`
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
`;

const H3 = styled.h3`
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
`;

// Media queries for 430x932 screen
// @media (max-width: 430px) and (max-height: 932px) {
//     ${Head1} {
//         align-items: center;
//     }

//     ${Head2} {
//         width: 80%;
//     }

//     ${Button} {
//         margin: 20% auto 10%;
//         width: 60%;
//     }
// }

export default getdata;
