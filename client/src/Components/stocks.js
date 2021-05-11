import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Posts = ({ view, stocks, loading, updateToView, deleteStock }) => {
  if (loading) {
    return <h2>loading....</h2>;
  }
  return (
    <table
      onClick={(e) => {
        var list = e.target.parentElement.parentElement.childNodes;
        if (e.target.innerText === "save data") {
          axios
            .post("/insert", {
              name: list[0].innerText,
              symbol: list[1].innerText,
              max_supply: parseInt(list[2].innerText),
            })
            .then((res) => {
              updateToView(list[0].innerText);
            });
        } else if (e.target.innerText === "Delete") {
          deleteStock(
            list[0].innerText,
            list[1].innerText,
            parseInt(list[2].innerText)
          );
        }
      }}
      className="table table-striped mt-4"
    >
      <thead>
        <tr className="bg-primary">
          <th>Company name</th>
          <th>Symbol</th>
          <th>Max_Supply</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          return (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>{stock.max_supply}</td>
              {view ? (
                <td>
                  <button type="button" className="btn btn-danger mt-1">
                    Delete
                  </button>
                </td>
              ) : (
                <td>
                  {stock.existed ? (
                    <Link to={`/view`}>
                      <button type="button" className="btn btn-secondary mt-1">
                        view data
                      </button>
                    </Link>
                  ) : (
                    <button type="button" className="btn btn-primary mt-1">
                      save data
                    </button>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Posts;
