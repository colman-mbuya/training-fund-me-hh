// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

library PriceConverter {
    function getPrice(IPyth priceFeed, bytes32 priceId) internal view returns (uint256) {
        PythStructs.Price memory currentBasePrice = priceFeed.getPriceUnsafe(priceId);
        // Ignoring the exponent for now, and returning just the price in wei. We will assume decimal price is returned price
        // with expo of 8. Need to figure out how to do this properly given Pyth returns signed ints. Also there is got to be
        // an easier way to do this conversion....
        return uint256(uint64(currentBasePrice.price)) * 1e10;
    }

    function getConversionRate(uint256 ethAmount, IPyth priceFeed, bytes32 priceId) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed, priceId);
        uint256 ethAmountInUsd = ( ethPrice * ethAmount ) / 1e36;
        return ethAmountInUsd;
    }
}