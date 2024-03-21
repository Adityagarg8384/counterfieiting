const hre= require("hardhat");
require("dotenv").config();

async function main(){
    const Campaignfactory= await hre.ethers.getContractFactory("ProductFactory");
    // console.log(Campaignfactory);
    const campaignfactory= await Campaignfactory.deploy();
    // console.log(campaignfactory);
    await campaignfactory.deployed();

    console.log("Factory deployed to :", campaignfactory.address);
}

main().then(()=>{
    console.log("Process has started successfully");
    process.exit(1);
})
.catch((err)=>{
    console.log(err);
    console.log("Some error occurred in the network");
})