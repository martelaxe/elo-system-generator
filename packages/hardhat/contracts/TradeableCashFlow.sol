//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TradeableCashflow is ERC721, RedirectAll {
    constructor(
        address owner,
        string memory _name,
        string memory _symbol,
        ISuperfluid host, // 0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3
        IConstantFlowAgreementV1 cfa, //0xECa8056809e7e8db04A8fF6e4E82cD889a46FE2F
        ISuperToken acceptedToken
    ) ERC721(_name, _symbol) RedirectAll(host, cfa, acceptedToken, owner) {
        _mint(owner, 1);
    }

    //now I will insert a nice little hook in the _transfer, including the RedirectAll function I need
    function _beforeTokenTransfer(
        address, /*from*/
        address to,
        uint256 /*tokenId*/
    ) internal override {
        _changeReceiver(to);
    }

    function deleteFlow(address _removedAddress) public {
        _deleteFlow(_removedAddress);
    }

    function addFlow(address _addedAddress) public {
        _addFlow(_addedAddress);
    }
}
