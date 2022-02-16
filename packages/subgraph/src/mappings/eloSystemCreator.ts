import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
    NewTable,
} from "../../generated/EloSystemCreator/EloSystemCreator";

import { EloTableDefinition } from '../../generated/templates'
import { Directory, Sender } from "../../generated/schema";

export function handleNewEloDefinition(event: NewTable): void {



    let tableAddressString = event.params.tableContractAddress.toHexString();

    let directory = Directory.load(tableAddressString);

    if (directory === null) {
        directory = new Directory(tableAddressString);
        directory.addressTable = event.params.tableContractAddress;
        directory.createdAt = event.block.timestamp;
    }

    EloTableDefinition.create(event.params.tableContractAddress);


    directory.save();

}

