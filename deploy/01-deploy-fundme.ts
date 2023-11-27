import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployFundMe: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainName: string = network.name

    let pythFeedAddress: string
    let pythPriceId: string
    if (developmentChains.includes(chainName)) {
        const pythMockContract = await deployments.get("MockPyth")
        pythFeedAddress = pythMockContract.address
        pythPriceId = networkConfig[chainName].pythPriceId!
    } else {
        pythFeedAddress = networkConfig[chainName].pythFeed!
        pythPriceId = networkConfig[chainName].pythPriceId!
    }
    log("------------------------------------------------------")
    log(`Deploying FundMe to ${chainName} and waiting for block confirmations if applicable...`)
    const fundMe = await await deploy("FundMe", {
        from: deployer,
        args: [pythFeedAddress, pythPriceId],
        log: true,
        waitConfirmations: networkConfig[chainName].blockConfirmations || 0
    })
    log(`FundMe deployed at ${fundMe.address}`)
    if (!developmentChains.includes(chainName) && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, [pythFeedAddress, pythPriceId])
    }
}

export default deployFundMe
deployFundMe.tags = ["all", "fundMe"]
