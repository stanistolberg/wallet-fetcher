import React, { useState } from "react";
import Wallet from "./Wallet";
import Moralis from "moralis";

Moralis.start({
  apiKey: "4riFoTkW3qFixqIb1bhCVyqlPSUxU7TRuOKPYXVHULRb7aJUtjfA1j6LHgZZT3BT"
  // ...and any other configuration
});

function App() {
  const [wallets, setWallets] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const address = formData.get("address");
    setWallets([...wallets, address]);
  }

  function handleClear() {
    setWallets([]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">
          Wallet Address:
          <input type="text" name="address" />
        </label>
        <button type="submit">Add Wallet</button>
      </form>
      <button onClick={handleClear}>Clear Wallets</button>
      {wallets.map((address) => (
        <Wallet key={address} address={address} />
      ))}
    </div>
  );
}

export default App;
