import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import ProductFactory from "../artifacts/contracts/Campaigns.sol/ProductFactory.json";
import Product from "../artifacts/contracts/Campaigns.sol/Product.json";
import styled from 'styled-components';
import bcrypt from "bcryptjs";

const Detail = ({ Data }) => {
    const [hash, setHash] = useState(null);
    const [change, setChange] = useState(false);
    const [data, setData] = useState();
    const [found, setFound] = useState(false);
    const [address, setAddress] = useState();
    const [encryptedhHash, setEncryptedHash] = useState("");

    useEffect(() => {
        const Request = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = web3provider.getSigner();
            const address = await signer.getAddress();

            const provider = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL,
            )

            const contract = new ethers.Contract(
                Data.address,
                Product.abi,
                provider,
            )

            const getFile = contract.filters.addproductsuccess();
            const dataFile = await contract.queryFilter(getFile);
            if (dataFile.length == 0) {

            }
            else {
                setData(dataFile[dataFile.length - 1].args.hashproduct);

            }
        }
        Request();
    }, [change]);

    const Addhash = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();


            const contract = new ethers.Contract(
                Data.address,
                Product.abi,
                signer,
            )

            var t;

            fetch("http://localhost:8000/encrypt", {
                method: 'POST',
                body: JSON.stringify({ hash: hash }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                console.log("Hello world");
                return res.json();
            }).catch((err) => {
                console.log(err);
            })
                .then(async (res) => {
                    console.log(res);
                    console.log(res.encryptedhash);
                    t = res.encryptedhash;
                    setEncryptedHash(t);

                    console.log(t);
                    console.log(encryptedhHash);


                    const doTask = await contract.addproduct(Data.productName, t);

                    await doTask.wait();

                    setChange(true);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })




        }
        catch (err) {

            console.log(err);
        }
    }

    const HashHandler = (e) => {

        const b = e.target.value;
        setHash(b);
    }

    const getHash = async () => {
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

        // console.log(product);

        const getFile = contract.filters.productcreated(Data.productName);
        const dataFile = await contract.queryFilter(getFile);

        setAddress(dataFile[0].args.productaddress);


        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3provide = new ethers.providers.Web3Provider(window.ethereum);
        const signe = web3provide.getSigner();


        const contrac = new ethers.Contract(
            address,
            Product.abi,
            signe
        )
        const getFil = contrac.filters.verifyproductsuccess();
        const addFile = await contract.queryFilter(getFil);

        setFound(true);

    }
    return (
        <Head1>
            <Head3>
                <Text>{Data.productName}</Text>
            </Head3>

            <Head5>
                <Head4>
                    <InputWrapper>
                        <InputName>Hash:</InputName>
                        <Input
                            type="text"
                            name="input3"
                            value={hash}
                            onChange={HashHandler}
                        />
                    </InputWrapper>
                    <RedButton onClick={Addhash}>AddHash</RedButton>
                </Head4>
                
            </Head5>
            <Head7>
            {encryptedhHash === "" ? <></> : <h>{encryptedhHash}</h>}
            </Head7>
            <BlueButton onClick={getHash}>GetHash</BlueButton>
            <Head2>
                {found === true ?
                    <Head6>
                        {data.map((e) => {
                            return (
                                <Task >
                                    <H3> {e} </H3>
                                </Task>

                            )
                        })}
                        <Text2>The Hash may be inconsistent. Add a new hash to make it consistent</Text2>
                    </Head6>
                    :
                    <div></div>
                }
            </Head2>

        </Head1>
    )
}

export async function getStaticPaths() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL,
    )

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        ProductFactory.abi,
        provider,
    )

    const getAllProducts = contract.filters.productcreated();
    const AllProducts = await contract.queryFilter(getAllProducts);


    return {
        paths: AllProducts.map((e) => ({
            params: {
                address: e.args.productaddress.toString() || null,
            }
        })),
        fallback: "blocking",
    }
}

export async function getStaticProps(context) {

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    )

    const contract = new ethers.Contract(
        context.params.address,
        Product.abi,
        provider,
    )

    const productName = await contract.ProductName();
    const ImageUri = await contract.ImageUri();
    // const productOwner= await contract.ProductOwner();
    const address = context.params.address;


    const Data = {
        productName,
        ImageUri,
        address,
    }
    console.log(Data);
    return {
        props: {
            Data,
        },
        revalidate: 10,
    }

}

const Text = styled.h1`
  font-size: 6vw;
  color: white;

  @media (max-width: 430px) {
    font-size: 8vw;
  }
`;

const Text2 = styled.h1`
  font-size: 1rem;
  color: white;

  @media (max-width: 430px) {
    font-size: 4vw;
  }
`;

const Head7= styled.div`
color:white;
`

const Head1 = styled.div`
  background-color: #14161a;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Head3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 430px) {
    margin-top: 10vw;
  }
`;

const Head5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Head4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  background-color: #191b21;
  width: 60vw;
  height: 10vw;

  @media (max-width: 430px) {
    margin-top: 15vw;
    width: 90vw;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputName = styled.div`
  margin-right: 10px;
  color: white;
  font-size: 1rem;

  @media (max-width: 430px) {
    font-size: 3vw;
  }
`;

const Head2 = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
`;

const Input = styled.input`
  padding: 10px;
  width: 20vw;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #212631;
  color: white;

  @media (max-width: 430px) {
    width: 80vw;
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
  margin-left: 3vw;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 430px) {
    font-size: 4vw;
    padding: 5px 10px;
    margin-left: 5vw;
  }
`;

const BlueButton = styled.button`
  margin-top: 2rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 4rem;
  width: 20vw;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 431px) {
    font-size: 4vw;
    padding: 5px 10px;
    margin-left: 3rem;
    width: 70vw;
  }
`;

const Task = styled.div`
  width: 40vw;
  background-color: #f4f4f4;
//   margin: 2px;
  padding: 10px 20px;
  cursor: pointer;
  overflow-wrap: break-word;

  @media (max-width: 431px) {
    width: 20rem;
  }
`;

const H3 = styled.h3`
//   font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  align: center;
  overflow-wrap: break;
  font-size: 1rem;
  @media (max-width: 431px) {
    font-size: 0.5rem;
  }
`;

const Head6 = styled.div`
  padding: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 44vw;
  border-radius: 1vw;
  background-color: #191b21;
  

  @media (max-width: 431px) {
    padding: 4vw;
    width: 20rem;
    border-radius: 2vw;
  }
`;

export default Detail;
