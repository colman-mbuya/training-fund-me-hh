// SEPOLIA Deployed - https://sepolia.etherscan.io/address/0x9247398E9e8D5b6a170A6cE8eC1F2BccF3aD68EC#code
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "dotenv/config"
import "hardhat-deploy-ethers";

const SEPOLIA_CHAIN_ID = 11155111

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: process.env.LOCAL_RPC_URL,
      accounts: [process.env.PRIVATE_KEY!],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY!],
      chainId: SEPOLIA_CHAIN_ID,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, //Use default first account when running on development chains as the contract deployer
      1: 0, // Use the first account when running on mainnet (chainId: 1), as defined in networks above
      SEPOLIA_CHAIN_ID: 0, // Use the first account in the list accounts provided for Sepolia
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "ZAR",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
}

export default config
