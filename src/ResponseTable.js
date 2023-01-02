import React from "react";
import "./ResponseTable.css";
import { useState, useEffect } from "react";

const ResponseTable = (props) => {
  const { walletAddress, responses } = props;

  const [Allresponses, setAllResponses] = useState([]);

  //create an array of all responses by adding new responses to the array
  useEffect(() => {
    if (props) {
      setAllResponses((prev) => [...prev, props]);
    }
  }, [props]);

console.log("Allresponses", Allresponses);

  // If the responses is empty, return an empty table
  if (!responses) {
    return <p>Empty responses</p>;
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

  //function to make the table filterable
  const [filteredResponse, setFilteredResponse] = useState(responses);
  const [filter, setFilter] = useState({
    balance: "",
    symbol: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  useEffect(() => {
    setFilteredResponse(
      props.responses.filter((item) => {
        if (filter.balance && item.balance < filter.balance) {
          return false;
        }
        if (filter.symbol && item.symbol !== filter.symbol) {
          return false;
        }
        return true;
      })
    );
  }, [filter, props.responses]);

  return (
    <>
      <div className="filter-form">
        <form>
          <label htmlFor="balance">
            Minimum balance:
            <input
              type="number"
              name="balance"
              value={filter.balance}
              onChange={handleFilterChange}
            />
          </label>
          <label htmlFor="symbol">
            Token symbol:
            <input
              type="text"
              name="symbol"
              value={filter.symbol}
              onChange={handleFilterChange}
            />
          </label>
        </form>
      </div>
      <table id="myTable" className="responsive-table">
        <thead>
          <tr>
            <th onClick={() => sortTable(0)} className="sort">
              Wallet Address
            </th>

            <th onClick={() => sortTable(1)} className="sort">
              Symbol
            </th>

            <th onClick={() => sortTable(2)} className="sort">
              Balance
            </th>

            <th onClick={() => sortTable(3)} className="sort">
              Chain
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredResponse.map((item, index) => (
            
            <tr key={index}>
              <td>{walletAddress}</td>

              <td>{item.symbol}</td>

              <td>{item.balance}</td>

              <td>{item.chain}</td>
            </tr>
          ))}
        </tbody>
      {/* <tbody>
        {responses.map((response) => {
          return response.responses.map((item) => (
            <tr key={item.symbol}>
              <td>{props.walletAddress}</td>
              <td>{item.symbol}</td>
              <td>{item.decimals}</td>
              <td>{item.balance}</td>
              <td>{item.chain}</td>
            </tr>
          ));
        })}
      </tbody> */}
    </table>
    </>
  );
};
//write annotation for the above code

export default ResponseTable;
