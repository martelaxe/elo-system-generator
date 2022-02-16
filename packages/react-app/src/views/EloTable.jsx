import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Divider, Input } from "antd";
import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

import { AddAccounts } from "../hooks"
import { Address } from "../components";
export default function EloTable(props) {


    const [account, setAccount] = useState("loading...");

    const handleInputChange = (event) => {
        const newAccount = event.target.value;
        setAccount(newAccount)
        console.log(newAccount)
    }

    const location = useLocation();


    console.log(location.state[0].userTable.tableName);
    console.log(location.state[0].userTable.tableAddress);

    console.log(props.userTables);

    const userSigner = props.userSigner;


    var address = location.state[0].userTable.tableAddress;

    address = address.toLowerCase();

    console.log("################## LOWER CASEEEEE", address)

    const EXAMPLE_GRAPHQL = `
    {
        directory(id: "${address}") {
            id
            eloAccounts {
                id
                address
                createdAt
                startingElo
            }
        }
    }
    `;


    // const EXAMPLE_GRAPHQL = `
    // {
    //     directory(id: "0xBA12646CC07ADBe43F8bD25D83FB628D29C8A762"){
    //         id
    //         eloAccounts {
    //             id
    //             address
    //             createdAt
    //             startingElo
    //         }   
    //     }
    // }
    // `;

    const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
    const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

    const purposeColumns = [
        {
            title: "Elo account",
            dataIndex: "address",
            key: "address",
            // render: record => <Address value={record} ensProvider={props.mainnetProvider} fontSize={16} />,
        },
        {
            title: "startingElo",
            key: "startingElo",
            dataIndex: "startingElo",
        },
        {
            title: "createdAt",
            key: "createdAt",
            dataIndex: "createdAt",
            render: d => new Date(d * 1000).toISOString(),
        },
    ];



    const { addAccount, addAccountState } = AddAccounts(address, userSigner)


    const handleAddAccountSubmit = () => {
        return addAccount(account)
    }

    return (
        <div>
            {/*
          ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
        */}
            <div style={{ border: "1px solid #cccccc", padding: 16, width: 800, margin: "auto", marginTop: 64 }}>
                {/* <h4>List of tables : {console.log("###" + listOfTablesOfUser)}</h4> */}


                <div style={{ margin: 8 }}>
                    <Input
                        onChange={handleInputChange}
                    />
                    <Button
                        style={{ marginTop: 8 }}
                        onClick={handleAddAccountSubmit}
                    >
                        Add New Account!
                    </Button>
                    <Divider />
                    {data ? (
                        <Table dataSource={data.directory.eloAccounts} columns={purposeColumns} rowKey="id" />
                    ) : (
                        <Typography>{loading ? "Loading..." : "Warning"}</Typography>
                    )}
                </div>
            </div>
        </div>
    );
}