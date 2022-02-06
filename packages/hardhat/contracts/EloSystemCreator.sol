//SPDX-License-Identifier :MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./EloTableDefinition.sol";
import "./EloToken.sol";

contract EloSystemCreator {
    // Map

    struct EloTable {
        address tableAddress;
        string tableName;
    }

    EloTable[] public eloTableList;

    function returnTable() public view returns (EloTable[] memory) {
        return eloTableList;
    }

    mapping(address => address) public tokenToTableAddress;
    mapping(address => uint256[]) public ownerToTables;

    address contractAddress;

    function deployEloTableDefinition(
        uint256 _startingElo,
        string memory _tableName
    ) public {
        EloToken eloToken = new EloToken(address(this));
        address _eloTokenAddress = address(eloToken);
        EloTableDefinition eloTableDefinition = new EloTableDefinition(
            _startingElo,
            _eloTokenAddress,
            _tableName
        );

        contractAddress = address(eloTableDefinition);

        eloTableList.push(EloTable(contractAddress, _tableName));

        uint256 id = eloTableList.length - 1;

        ownerToTables[msg.sender].push(id);

        eloToken.transfer(contractAddress, eloToken.totalSupply());

        tokenToTableAddress[contractAddress] = _eloTokenAddress;
    }

    function getTablesByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        return ownerToTables[_owner];
    }
}
