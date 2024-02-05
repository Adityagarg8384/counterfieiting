require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

task("accounts","Print the list of accounts", async (taskArgs, hre)=>{
  const accounts= await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account.address);
  }
})

// const Privatekey= process.env.NEXT_PUBLIC_PRIVATE_KEY;
console.log(process.env.NEXT_PUBLIC_RPC_URL);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"sepolia",
  networks:{
    hardhat:{},
    sepolia:{
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_ALCHEMEY_KEY}`,
      accounts:[process.env.NEXT_PRIVATE_KEY],
    }
  }
};
