import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Stocks from "./stocks.js";
import Pagination from "./paginate";
import axios from "axios";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 5,
      stocks: this.props.stocks,
      loading: true,
      currentStocks: [],
      Input: "",
      search: false,
      view: this.props.view,
      search_stocks: [],
    };
  }
  inputchange = (e) => {
    this.setState({ Input: e.target.value });
  };
  search = (e) => {
    axios.get("/stocks").then((res) => {
      const data = res.data.filter((stock) => stock.name === this.state.Input);
      var search_stocks = [...this.state.search_stocks];
      for (let i = 0; i < data.length; i++) {
        search_stocks[i] = {};
        search_stocks[i].id = i;
        search_stocks[i].name = data[i].name;
        search_stocks[i].symbol = data[i].symbol;
        search_stocks[i].max_supply = parseInt(data[i].max_supply);
      }
      this.setState({ search_stocks });
      this.setState({ view: true });
      this.setState({ search: true });
      console.log(this.state.search_stocks);
    });
  };
  componentDidMount() {
    this.CurrentStocks(this.state.currentPage);
    this.setState({ loading: false });
  }
  CurrentStocks = (number) => {
    const indexOfLastPost = number * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    var currentStocks = [...this.state.currentStocks];
    currentStocks = this.state.stocks.slice(indexOfFirstPost, indexOfLastPost);
    this.setState({ currentStocks });
    this.setState({ currentPage: number });
  };
  updateToView = (name) => {
    var stocks = [...this.state.stocks];
    var stock = stocks.filter((stock) => stock.name === name);
    console.log(stock[0]);
    stock[0].existed = true;
    this.setState({ stocks });
  };
  paginate = (number) => {
    if (number === "Next") {
      var nextpage = this.state.currentPage + 1;
      this.CurrentStocks(nextpage);
    } else if (number === "Previous") {
      var previouspage = this.state.currentPage - 1;
      this.CurrentStocks(previouspage);
    } else {
      this.CurrentStocks(number);
    }
  };
  deleteStock = (name) => {
    axios.delete("/delete", { data: { name: name } }).then(() => {
      var currentStocks = [...this.state.currentStocks];
      var removeIndex = currentStocks
        .map(function (item) {
          return item.name;
        })
        .indexOf(name);
      currentStocks.splice(removeIndex, 1);
      this.setState({ currentStocks });
      console.log(this.state.currentStocks);
    });
  };
  render() {
    const {
      loading,
      currentStocks,
      currentPage,
      view,
      search_stocks,
    } = this.state;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="d-flex">
            <h2>Crypto Currency App</h2>
            <form className="d-flex  float-left">
              <input
                className="mr-6 form-control me-2"
                placeholder="search"
                onChange={this.inputchange}
              ></input>
              <button
                onClick={(e) => {
                  this.search(e);
                }}
                className="btn btn-outline-success "
                type="button"
              >
                search
              </button>
            </form>
          </div>
        </nav>
        {this.state.search ? (
          <React.Fragment>
            <Stocks
              view={view}
              stocks={search_stocks}
              loading={loading}
              updateToView={this.updateToView}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stocks
              deleteStock={this.deleteStock}
              view={view}
              stocks={currentStocks}
              loading={loading}
              updateToView={this.updateToView}
            />
          </React.Fragment>
        )}
        <Pagination
          loading={loading}
          paginate={this.paginate}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}
export default MainPage;
