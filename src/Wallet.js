import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import ResponseTable from "./ResponseTable";

function Wallet(props) {
  const [ethResponse, setEthResponse] = useState(null);
  const [ethResponse2, setEthResponse2] = useState(null);
  const [bscResponse, setBscResponse] = useState(null);
  const [bscResponse2, setBscResponse2] = useState(null);
  const [polyResponse, setPolyResponse] = useState(null);
  const [polyResponse2, setPolyResponse2] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    async function fetchBalances() {
      try {

        
        // Fetch ETH balances
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const ethResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
          address: props.address,
          chain: EvmChain.ETHEREUM,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const ethResponse2 = await Moralis.EvmApi.balance.getNativeBalance({
          address: props.address,
          chain: EvmChain.ETHEREUM,
        });

        // Fetch BSC balances
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const bscResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
          address: props.address,
          chain: EvmChain.BSC,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const bscResponse2 = await Moralis.EvmApi.balance.getNativeBalance({
          address: props.address,
          chain: EvmChain.BSC,
        });

        // Fetch Polygon balances
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const polyResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
          address: props.address,
          chain: EvmChain.POLYGON,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const polyResponse2 = await Moralis.EvmApi.balance.getNativeBalance({
          address: props.address,
          chain: EvmChain.POLYGON,
        });

        // Set responses
        setEthResponse(ethResponse);
        setEthResponse2(ethResponse2);
        setBscResponse(bscResponse);
        setBscResponse2(bscResponse2);
        setPolyResponse(polyResponse);
        setPolyResponse2(polyResponse2);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchBalances();
  }, [props.address]);

  //implement a delay to wait for all responses to come back
  if (
    !ethResponse ||
    !bscResponse ||
    !polyResponse ||
    !ethResponse2 ||
    !bscResponse2 ||
    !polyResponse2
  ) {
    return <p>Loading...</p>;
  }
  

  //save all responses in the local storage
  localStorage.setItem("ethResponse", JSON.stringify(ethResponse, null, 2));

  localStorage.setItem("bscResponse", JSON.stringify(bscResponse, null, 2));

  localStorage.setItem("polyResponse", JSON.stringify(polyResponse, null, 2));

  localStorage.setItem("ethResponse2",  Array.of(JSON.stringify(ethResponse2, null, 2)));

  localStorage.setItem("bscResponse2",  Array.of(JSON.stringify(bscResponse2, null, 2)));

  localStorage.setItem("polyResponse2",  Array.of(JSON.stringify(polyResponse2, null, 2)));
    

  //load all responses from the local storage and rename them
  const ethResponse_token = JSON.parse(localStorage.getItem("ethResponse"));
  const ethResponse_native = JSON.parse(localStorage.getItem("ethResponse2"));
  const bscResponse_native = JSON.parse(localStorage.getItem("bscResponse2"));
  const polyResponse_native = JSON.parse(localStorage.getItem("polyResponse2"));
  const bscResponse_token = JSON.parse(localStorage.getItem("bscResponse"));
  const polyResponse_token = JSON.parse(localStorage.getItem("polyResponse"));

  //modify the JSON responses to only include chain, decimals, symbol and balance and delete the rest.
  ethResponse_token.forEach((item) => {
    delete item.address;
    delete item.logo_url;
    delete item.name;
    delete item.token_address;
    delete item.thumbnail_url;
    delete item.logo;
    delete item.thumbnail;
    item.chain = "ETH";
  });



  [ethResponse_native].forEach((item) => {
    
    item.symbol = "ETH";
    item.decimals = 18;

    item.chain = "ETH";
  });

  // console.log("ethResponse_native-before", ethResponse_native);
  
  //change the order of the array from {balance: '0', symbol: 'ETH', decimals: 0, chain: 'ETH'} to {symbol: 'ETH', decimals: 0, balance: '0', chain: 'ETH'}





  // console.log("ethResponse_native", ethResponse_native);


  
  bscResponse_token.forEach((item) => {
    delete item.address;
    delete item.logo_url;
    delete item.name;
    delete item.token_address;
    delete item.thumbnail_url;
    delete item.logo;
    delete item.thumbnail;
    item.chain = "BSC";
  });


  [bscResponse_native].forEach((item) => {
    item.symbol = "BNB";
    item.decimals = 18;

    item.chain = "BSC";
  });


  polyResponse_token.forEach((item) => {
    delete item.address;
    delete item.logo_url;
    delete item.name;
    delete item.token_address;
    delete item.thumbnail_url;
    delete item.logo;
    delete item.thumbnail;
    item.chain = "POLY";
  });

  [polyResponse_native].forEach((item) => {
    item.symbol = "MATIC";
    item.decimals = 18;

    item.chain = "POLY";
  });


//combine native responses into one array
  const nativeResponses = [ethResponse_native].concat(
    bscResponse_native,
    polyResponse_native
  );

const reorderedNativeResponses = nativeResponses.map((item) => {
    return {
      symbol: item.symbol,
      decimals: item.decimals,
      balance: item.balance,
      chain: item.chain,
    };
  });

  console.log("reorderedNativeResponses", reorderedNativeResponses);

  //combine all responses into one array
  const allResponses = ethResponse_token.concat(
    bscResponse_token,
    polyResponse_token,
    reorderedNativeResponses
  );

  console.log("allResponses", allResponses);




  //convert the balance to a number
  allResponses.forEach((item) => {
    item.balance = Number(item.balance);
  });

  //divide the balance by 10^decimals
  allResponses.forEach((item) => {
    item.balance = item.balance / Math.pow(10, item.decimals);
  });

  //sort the array by chain
  allResponses.sort((a, b) => {
    if (a.chain < b.chain) {
      return -1;
    }
    if (a.chain > b.chain) {
      return 1;
    }
    return 0;
  });

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <ResponseTable
            walletAddress={props.address}
            response={allResponses}
          />

          {/* show allResponses as a string */}
          {/* <pre>{JSON.stringify(allResponses, null, 1)}</pre> */}
        </>
      )}
    </div>
  );
}

export default Wallet;
