import React from "react";
import "./ResponseTable.css";

const ResponseTable = (props) => {
  const { walletAddress, response } = props;

  // If the response is empty, return an empty table
  if (!response) {
    return <p>Empty response</p>;
  }

  // function to make the table sortable
  function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  return (
    <table id="myTable" className="responsive-table">
      <thead>
        <tr>
          <th onClick={() => sortTable(0)}>Wallet Address</th>

          <th onClick={() => sortTable(1)}>Symbol</th>

          <th onClick={() => sortTable(2)}>Balance</th>

          <th onClick={() => sortTable(3)}>Chain</th>
        </tr>
      </thead>
      <tbody>
        {response.map((item, index) => (
          <tr key={index}>
            <td>{walletAddress}</td>

            <td>{item.symbol}</td>

            <td>{item.balance}</td>

            <td>{item.chain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
//write annotation for the above code

export default ResponseTable;
