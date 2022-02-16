// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("YourContract", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 5,
  });

  await deploy("EloSystemCreator", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 5

  });

  const EloSystemCreatorContract = await ethers.getContractAt("EloSystemCreator", deployer);

  await deploy("EloToken", {
    from: deployer,
    args: [EloSystemCreatorContract.address],
    log: true,
    waitConfirmations: 5

  });

  const EloTokenContract = await ethers.getContractAt("EloToken", deployer);

  await deploy("EloTableDefinition", {
    from: deployer,
    args: [1200, EloTokenContract.address, "tableName"],
    log: true,
    waitConfirmations: 5

  });


  // await EloSystemCreator.deployEloTableDefinition(1200);

  // await deploy("EloToken", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  //   waitConfirmations: 5

  // });

  // const EloTokenAddress = await EloTokenAddress.address;


  // await deploy("EloTableDefinition", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  //   waitConfirmations: 5

  // });



  // const EloDefinitionContract = await ethers.getContractAt("EloTableDefinition", "0x7D3B83DAd01E159Ee0845B1984ad9feea2131E49");

  // await EloDefinitionContract.addEloAccount(0x5EFE2D8094D23d1f5C42f5Bdc8fE501B1A4C1E66);





  // const tableToGenAddress = await EloSystemCreator.tableToGenAddress(deployer);

  // const tokenToTableAddress = await EloSystemCreator.tokenToTableAddress(tableToGenAddress);

  // const EloDefinition = await ethers.getContractAt("EloTableDefinition", "tableToGenAddress");

  // console.log(tableToGenAddress);

  // console.log(tokenToTableAddress);












  // const TradeableCashflow = await ethers.getContract("TradeableCashflow", deployer);


  // const TradeableCashflow = await ethers.getContractAt("TradeableCashflow", "0xcBc5A14A9aE93D9C37D9E710E6d4c88242fD7F3e");
  // console.log(TradeableCashflow.address)
  // await TradeableCashflow.addFlow("0x96A7D9af9c21F5C031dF3Ff1228697edd7e58f1e");


  // Getting a previously deployed contract
  // const YourContract = await ethers.getContract("YourContract", deployer);
  /*  await YourContract.setPurpose("Hello");
  






























  // Getting a previously deployed contract
  // const YourContract = await ethers.getContract("YourContract", deployer);
  /*  await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["TradeableCashflow", "EloSystemCreator", "YourContract", "EloTableDefinition"];
