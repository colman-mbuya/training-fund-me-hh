import { run } from "hardhat"

const verify =async (contractAddress:string, args: any[]) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log(error)
        }
    }
}

export default verify