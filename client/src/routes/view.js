import React, { Component } from "react";
import axios from "axios";
import MainPage from "../Components/MainPage.js";

class View extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/stocks").then((res) => {
      const data = res.data;
      const stocks = [...this.state.stocks];
      for (let i = 0; i < data.length; i++) {
        stocks[i] = {};
        stocks[i].id = i;
        stocks[i].name = data[i].name;
        stocks[i].symbol = data[i].symbol;
        stocks[i].max_supply = parseInt(data[i].max_supply);
      }
      this.setState({ stocks });
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <></>;
    }
    return (
      <React.Fragment>
        <MainPage view={true} stocks={this.state.stocks} />
      </React.Fragment>
    );
  }
}
export default View;
