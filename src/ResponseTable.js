import React from 'react';
import big_js from 'big.js';



const ResponseTable = (props) => {
  const { walletAddress, response } = props;


  // If the response is empty, return an empty table
  if (!response) {
    return <p>Empty response</p>;
  }

  // // Stringify the response object
  // const responseString = JSON.stringify(response, null, 2);

  // // Log the response object
  // console.log(responseString);

  // // Parse the response object from its stringified form
  // const responseObject = JSON.parse(responseString);
  

  return (
    <table>
      <thead>
        <tr>
          <th>Wallet Address</th>

          <th>Symbol</th>

          <th>Balance</th>

          <th>Chain</th>
        </tr>
      </thead>
      <tbody>
        {response.map((item, index) => (

          <tr key={index}>
            <td>{walletAddress}</td>
            
            <td>{item.symbol}</td>

            <td>{item.balance}</td>

            <td>{item.chain}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
//write annotation for the above code




export default ResponseTable;
