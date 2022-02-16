import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  EloTableDefinition,
  AddAccount,
} from "../../generated/templates/EloTableDefinition/EloTableDefinition";
import { EloAccount, Sender } from "../../generated/schema";

export function handleAddAccount(event: AddAccount): void {

  let eloAccount = new EloAccount(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  eloAccount.address = event.params.addedAccount;
  eloAccount.createdAt = event.block.timestamp;
  eloAccount.startingElo = event.params.startingElo;

  let tableAddressString = event.params.addresTable.toHexString();
  eloAccount.ownerTable = tableAddressString;

  eloAccount.save();

}
