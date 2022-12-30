import React, { useState, useEffect} from "react";
import Wallet from "./Wallet";
import Moralis from "moralis";
import ErrorBoundary from "./ErrorBoundary";

Moralis.start({
  apiKey: "4riFoTkW3qFixqIb1bhCVyqlPSUxU7TRuOKPYXVHULRb7aJUtjfA1j6LHgZZT3BT"
  // ...and any other configuration
});

function App() {
  const [wallets, setWallets] = useState([]);
  const [counter, setCounter] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const addresses = formData.get("addresses");
    setWallets(addresses.split("\n"));
    
    //add a timeout for each address
    for (let i = 0; i < wallets.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log(i);
    }
    //add a timeout for each address
    
  }

  function handleClear() {
    setWallets([]);
  }
//useEffect to render wallets in batches of 10 every 3 seconds 
  useEffect(() => {
    if (counter < wallets.length) {
      setTimeout(() => {
        setCounter(counter + 1);
      }, 5000);
    }
  }, [counter, wallets]);

  //export rendered wallet components to csv
  function exportData() {
    const csvRows = [];
    const headers = [
      "Address",
      "ETH Balance",
      "ETH Token Balances",
      "BSC Balance",
      "BSC Token Balances",
      "Polygon Balance",
      "Polygon Token Balances",
    ];
    csvRows.push(headers.join(","));
    for (const row of wallets) {
      const values = [
        row.address,
        row.ethBalance,
        row.ethTokenBalances,
        row.bscBalance,
        row.bscTokenBalances,
        row.polyBalance,
        row.polyTokenBalances,
      ];
      csvRows.push(values.join(","));
    }
    const csvString = csvRows.join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
    a.download = "data.csv";
    a.click();
  }







console.log(wallets)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addresses">
          Wallet Addresses (separated by new line):
          <textarea name="addresses" rows={20} cols={100} />
        </label>
        <button type="submit">Add Wallets</button>
      </form>
      <button onClick={handleClear}>Clear Wallets</button>
      {wallets.slice(0, counter).map((address) => (
        <ErrorBoundary key={address}>
          <Wallet address={address} />
        </ErrorBoundary>
      ))}
      {counter < wallets.length && <p>Waiting for 2 seconds...</p>}

      <button onClick={exportData}>Export Data</button>
    </div>
  );







}

export default App;
