import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, Events } from "../components";
import { useLocation } from "react-router-dom";
import { Contract } from "@ethersproject/contracts"
import EloDefinition from "../contracts/EloTableDefinition.json"
import { constants } from "ethers"
import { useEthers, useContractFunction } from "@usedapp/core"
import { AddAccounts } from "../hooks"
export default function EloTable({
    userSigner




}) {
    const [account, setAccount] = useState("loading...");

    const handleInputChange = (event) => {
        const newAccount = event.target.value;
        setAccount(newAccount)
        console.log(newAccount)
    }

    const location = useLocation();


    console.log(location.state[0].userTable.tableName);
    console.log(location.state[0].userTable.tableAddress);


    const address = location.state[0].userTable.tableAddress;

    const { addAccount, addAccountState } = AddAccounts(address, userSigner)




    const handleAddAccountSubmit = () => {
        return addAccount(account)
    }

    return (
        <div>
            {/*
          ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
        */}
            <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
                <h2>Your Accounts:</h2>
                {/* <h4>List of tables : {console.log("###" + listOfTablesOfUser)}</h4> */}


                <Divider />
                <div style={{ margin: 8 }}>
                    <Input
                        onChange={handleInputChange}
                    />
                    <Button
                        style={{ marginTop: 8 }}
                        onClick={handleAddAccountSubmit}
                    >
                        Add New Elo Table!
                    </Button>
                </div>
            </div>
        </div>
    );
}