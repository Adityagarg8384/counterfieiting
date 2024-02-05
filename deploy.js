const hre= require("hardhat");
require("dotenv").config();

async function main(){
    const ProductFactory= await hre.ethers.getContractFactory("ProductFactory");
    const productfactory= await ProductFactory.deploy();

    await productfactory.deployed();

    console.log("Factory deployed to :", productfactory.address);
}

main().then(()=>{
    console.log("Process has started successfully");
    process.exit(1);
})
.catch((err)=>{
    console.log(err);
    console.log("Some error occurred in the network");
})
