import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../helper-hardhat-config"

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainName = network.name

  if (developmentChains.includes(chainName)) {
    log("Deploying mocks since we are running on a local network...")
    const mockPyth = await deploy("MockPyth", {
        from: deployer,
        log: true
        // args: []
    })
    log(`MockPyth deployed at ${mockPyth.address}!`)
    log("-----------------------------------")
  }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
