pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract is Ownable {
    // event SetPurpose(address sender, string purpose);

    string public purpose = "Building Unstoppable Apps!!!";

    string public test222 = "Is this always test222";

    mapping(address => address) public testMapping;

    function setPurpose(string memory newPurpose) public onlyOwner {
        purpose = newPurpose;
        console.log(msg.sender, "set purpose to", purpose);
        // emit SetPurpose(msg.sender, purpose);
    }

    function setTest(string memory test) public pure returns (string memory) {
        return test;
    }

    // to support receiving ETH by default
    receive() external payable {}

    fallback() external payable {}
}
