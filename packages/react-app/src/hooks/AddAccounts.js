
import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import EloDefinition from "../contracts/EloTableDefinition.json"
export const AddAccounts = (eloDefinitionAddress, userSigner) => {

    console.log(userSigner);




    const eloDefinitionAbi = EloDefinition.abi;
    const eloDefinitionInterface = new utils.Interface(eloDefinitionAbi)
    const eloDefinitionContract = new Contract(eloDefinitionAddress, eloDefinitionInterface, userSigner)



    const { send: addAccountSend, state: addAccountState } = useContractFunction(eloDefinitionContract, "addEloAccount")

    const addAccount = (address) => {
        return addAccountSend(address)
    }

    return { addAccount, addAccountState }


}