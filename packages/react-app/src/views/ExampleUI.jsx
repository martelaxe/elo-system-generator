import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, Events } from "../components";
import { useHistory, Link } from "react-router-dom";

export default function ExampleUI({

  tx,
  writeContracts,
  userTables,


}) {
  const [newPurpose, setNewPurpose] = useState("loading...");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Your Tables:</h2>
        {/* <h4>List of tables : {console.log("###" + listOfTablesOfUser)}</h4> */}

        {userTables.map(userTable => (
          <li>  <Link to={{
            pathname: '/elotable',
            state: [{ userTable }]
          }}> {userTable ? (userTable.tableName) : (<div>Loading</div>)} </Link></li>
        ))}

        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {

              const result = tx(writeContracts.EloSystemCreator.deployEloTableDefinition(1200, newPurpose), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Add New Elo Table!
          </Button>
        </div>
      </div>
    </div>
  );
}
