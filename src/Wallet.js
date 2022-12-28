import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import Big from "big.js";

function Wallet(props) {
  const [balance, setBalance] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalances() {
      try {
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          address: props.address,
          chain: EvmChain.ETHEREUM
        });

        setResponse(response);

        const balances = {};
        for (const token of response.result) {
          const { token_address, balance, symbol } = token;
          if (!balance || !symbol) {
            throw new Error("Invalid balance or symbol format");
          }

          const bigBalance = new Big(balance);
          if (bigBalance.isNaN()) {
            throw new Error("Invalid balance");
          }

          balances[symbol] = bigBalance.toString();
        }

        setBalance(balances);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchBalances();
  }, [props.address]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Address: {props.address}</p>
          {Object.entries(balance).map(([symbol, balance]) => (
            <p key={symbol}>
              {symbol}: {balance}
            </p>
          ))}
          {response ? (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          ) : (
            <p>empty response</p>
          )}
        </>
      )}
    </div>
  );
}

export default Wallet;
