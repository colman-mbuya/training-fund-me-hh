// Defining some custom objects to use in our networkConfig
export interface networkConfigItem {
    pythFeed?: string
    pythPriceId?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {
    pythPriceId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
  },
  hardhat: {
    pythPriceId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
  },
  sepolia: {
    pythFeed: "0x2880ab155794e7179c9ee2e38200202908c17b43",
    pythPriceId:
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
    blockConfirmations: 6,
  },
}

export const developmentChains = ["hardhat", "localhost"]

