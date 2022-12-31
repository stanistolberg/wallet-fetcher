import React, { useState, useEffect } from "react";
import Wallet from "./Wallet";
import Moralis from "moralis";
import ErrorBoundary from "./ErrorBoundary";
import "./styles.css";

Moralis.start({
  apiKey: "4riFoTkW3qFixqIb1bhCVyqlPSUxU7TRuOKPYXVHULRb7aJUtjfA1j6LHgZZT3BT",
});

function App() {
  const [wallets, setWallets] = useState([]);
  const [counter, setCounter] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const addresses = formData.get("addresses");
    setWallets(addresses.split("\n"));
  }

  function handleClear() {
    setWallets([]);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (counter < wallets.length) {
        setCounter(counter + 1);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [counter, wallets]);

  return (
    <div className="app">
      <header className="header">
        <h1>My Wallet Fetcher App</h1>
      </header>
      <main className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <label htmlFor="addresses">
              Wallet Addresses (separated by new line):
              <br />
              <textarea
                name="addresses"
                rows={20}
                cols={100}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <button type="submit">Add Wallets</button>
          <button onClick={handleClear}>Clear Wallets</button>
        </form>

        {wallets.slice(0, counter).map((address) => (
          <ErrorBoundary key={address}>
            <Wallet address={address} />
          </ErrorBoundary>
        ))}
        {/* add rotating spinner here
        

        
        */}




        {counter < wallets.length && <p>Wallet balance requested...<div className="loader"></div></p>}


      </main>
      <footer className="footer">
        <p>Copyright My App 2022</p>
      </footer>
    </div>
  );
}

export default App;
