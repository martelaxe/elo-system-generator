//SPDX-License-Identifier :MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EloTableDefinition {
    IERC20 public eloToken;

    mapping(address => uint256) public eloAddressToElo;

    address[] public eloAccounts;
    uint256 startingElo;
    string public tableName;

    constructor(
        uint256 _startingElo,
        address _eloTokenAddress,
        string memory _tableName
    ) {
        startingElo = _startingElo;
        eloToken = IERC20(_eloTokenAddress);
        tableName = _tableName;
    }

    function addEloAccount(address _eloAddress) public {
        eloAccounts.push(_eloAddress);
        eloToken.transfer(_eloAddress, startingElo);
    }

    function changeElo(address _winningAddress, address _losingAddress) public {
        uint256 winningBalanceAcc = eloToken.balanceOf(_winningAddress);
        uint256 losingAddress = eloToken.balanceOf(_losingAddress);
        // For testing         //Real value will be something made by an elo algoritm, maybe customizable with K parameter
        uint8 amount = 20;

        eloToken.transferFrom(_losingAddress, _winningAddress, amount);
    }
}
