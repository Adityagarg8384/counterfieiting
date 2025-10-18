// import React, { useEffect, useState } from 'react'
// import { ethers } from 'ethers';
// import ProductFactory from "../artifacts/contracts/Campaigns.sol/ProductFactory.json";
// import Product from "../artifacts/contracts/Campaigns.sol/Product.json";
// import styled from 'styled-components';
// import bcrypt from "bcryptjs";

// const Detail = ({ Data }) => {
//   const [hash, setHash] = useState(null);
//   const [change, setChange] = useState(false);
//   const [data, setData] = useState();
//   const [found, setFound] = useState(false);
//   const [address, setAddress] = useState();
//   const [encryptedhHash, setEncryptedHash] = useState("");

//   useEffect(() => {
//     const Request = async () => {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const web3provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = web3provider.getSigner();
//       const address = await signer.getAddress();

//       const provider = new ethers.providers.JsonRpcProvider(
//         process.env.NEXT_PUBLIC_RPC_URL,
//       )

//       const contract = new ethers.Contract(
//         Data.address,
//         Product.abi,
//         provider,
//       )

//       const getFile = contract.filters.addproductsuccess();
//       const dataFile = await contract.queryFilter(getFile);
//       if (dataFile.length == 0) {

//       }
//       else {
//         setData(dataFile[dataFile.length - 1].args.hashproduct);

//       }
//     }
//     Request();
//   }, [change]);

//   const Addhash = async () => {
//     try {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();


//       const contract = new ethers.Contract(
//         Data.address,
//         Product.abi,
//         signer,
//       )

//       var t;

//       fetch("https://counterfieiting.vercel.app/encrypt", {
//         method: 'POST',
//         body: JSON.stringify({ hash: hash }),
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//       }).then((res) => {
//         console.log("Hello world");
//         return res.json();
//       }).catch((err) => {
//         console.log(err);
//       })
//         .then(async (res) => {
//           console.log(res);
//           console.log(res.encryptedhash);
//           t = res.encryptedhash;
//           setEncryptedHash(t);

//           console.log(t);
//           console.log(encryptedhHash);


//           const doTask = await contract.addproduct(Data.productName, t);

//           await doTask.wait();

//           setChange(true);
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         })




//     }
//     catch (err) {

//       console.log(err);
//     }
//   }

//   const HashHandler = (e) => {

//     const b = e.target.value;
//     setHash(b);
//   }

//   const getHash = async () => {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const web3provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = web3provider.getSigner();
//     const address = await signer.getAddress();

//     const provider = new ethers.providers.JsonRpcProvider(
//       process.env.NEXT_PUBLIC_RPC_URL,
//     )


//     const contract = new ethers.Contract(
//       process.env.NEXT_PUBLIC_ADDRESS,
//       ProductFactory.abi,
//       provider,
//     )

//     // console.log(product);

//     const getFile = contract.filters.productcreated(Data.productName);
//     const dataFile = await contract.queryFilter(getFile);

//     setAddress(dataFile[0].args.productaddress);


//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const web3provide = new ethers.providers.Web3Provider(window.ethereum);
//     const signe = web3provide.getSigner();


//     const contrac = new ethers.Contract(
//       address,
//       Product.abi,
//       signe
//     )
//     const getFil = contrac.filters.verifyproductsuccess();
//     const addFile = await contract.queryFilter(getFil);

//     setFound(true);

//   }
//   return (
//     <div className="bg-[#14161a] h-screen flex flex-col justify-start items-center">
//       {/* Product Name */}
//       <div className="flex justify-center items-center mt-8 md:mt-8">
//         <h1 className="text-white text-[8vw] md:text-[6vw]">{Data.productName}</h1>
//       </div>

//       {/* Input & AddHash Button */}
//       <div className="flex justify-center items-center mt-8">
//         <div className="flex justify-center items-center mt-8 bg-[#191b21] w-[90vw] md:w-[60vw] md:h-[10vw]">
//           <div className="flex justify-center items-center">
//             <div className="mr-2 text-white text-[3vw] md:text-base">Hash:</div>
//             <input
//               type="text"
//               name="input3"
//               value={hash || ""}
//               onChange={HashHandler}
//               className="p-2 w-[80vw] md:w-[20vw] border-0 rounded text-base bg-[#212631] text-white"
//             />
//           </div>
//           <button
//             onClick={Addhash}
//             className="bg-[#f44336] text-white py-1 px-2 ml-[5vw] transition-colors duration-300 hover:bg-[#d32f2f] focus:outline-none md:py-2 md:px-5 md:ml-[3vw] md:text-base"
//           >
//             AddHash
//           </button>
//         </div>
//       </div>

//       {/* Encrypted Hash Display */}
//       <div className="text-white mt-4">
//         {encryptedhHash !== "" && <span>{encryptedhHash}</span>}
//       </div>

//       {/* GetHash Button */}
//       <button
//         onClick={getHash}
//         className="mt-8 py-1 px-2 bg-[#007bff] text-white border-0 rounded text-[4vw] ml-[3rem] w-[70vw] transition-colors duration-300 hover:bg-[#0056b3] focus:outline-none md:py-2 md:px-5 md:text-base md:ml-[4rem] md:w-[20vw]"
//       >
//         GetHash
//       </button>

//       {/* Display Task Data */}
//       <div className="w-screen flex justify-center items-center mt-2">
//         {found ? (
//           <div className="p-[4vw] w-[20rem] rounded-[2vw] bg-[#191b21] flex flex-col justify-center items-center md:p-[0.2rem] md:w-[44vw] md:rounded-[1vw]">
//             {data &&
//               data.map((e, i) => (
//                 <div key={i} className="w-[40vw] bg-[#f4f4f4] py-2 px-5 cursor-pointer break-words sm:w-[20rem]">
//                   <h3 className="flex items-center justify-between font-bold break-words text-[0.5rem] md:text-base">
//                     {e}
//                   </h3>
//                 </div>
//               ))}
//             <h1 className="text-[4vw] text-white md:text-base">
//               The Hash may be inconsistent. Add a new hash to make it consistent
//             </h1>
//           </div>
//         ) : (
//           <div></div>
//         )}
//       </div>
//     </div>
//   )
// }

// export async function getStaticPaths() {
//   const provider = new ethers.providers.JsonRpcProvider(
//     process.env.NEXT_PUBLIC_RPC_URL,
//   )

//   const contract = new ethers.Contract(
//     process.env.NEXT_PUBLIC_ADDRESS,
//     ProductFactory.abi,
//     provider,
//   )

//   const getAllProducts = contract.filters.productcreated();
//   const AllProducts = await contract.queryFilter(getAllProducts);


//   return {
//     paths: AllProducts.map((e) => ({
//       params: {
//         address: e.args.productaddress.toString() || null,
//       }
//     })),
//     fallback: "blocking",
//   }
// }

// export async function getStaticProps(context) {

//   const provider = new ethers.providers.JsonRpcProvider(
//     process.env.NEXT_PUBLIC_RPC_URL
//   )

//   const contract = new ethers.Contract(
//     context.params.address,
//     Product.abi,
//     provider,
//   )

//   const productName = await contract.ProductName();
//   const ImageUri = await contract.ImageUri();
//   // const productOwner= await contract.ProductOwner();
//   const address = context.params.address;


//   const Data = {
//     productName,
//     ImageUri,
//     address,
//   }
//   console.log(Data);
//   return {
//     props: {
//       Data,
//     },
//     revalidate: 10,
//   }

// }

// export default Detail;
