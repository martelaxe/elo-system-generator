//SPDX-License-Identifier :MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EloToken is ERC20 {
    constructor(address _address) public ERC20("Elo Token", "ELO") {
        _mint(_address, 1000000000000000000000000);
    }
}
