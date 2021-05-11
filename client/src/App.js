import React, { Component } from "react";
import MainPage from "./Components/MainPage.js";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      saveddata: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .get("/stocks")
      .then((res) => {
        const data = res.data;
        const saveddata = [...this.state.saveddata];
        for (let i = 0; i < data.length; i++) {
          saveddata[i] = {};
          saveddata[i].name = data[i].name;
          saveddata[i].symbol = data[i].symbol;
          saveddata[i].max_supply = parseInt(data[i].max_supply);
        }
        this.setState({ saveddata });
      })
      .then(() => {
        axios
          .get(
            "http://api.coinlayer.com/list?access_key=310b29a1427b806043e3e2f98bb0372d"
          )
          .then((res) => {
            console.log(res);
            let obj = res.data.crypto;
            let data = Object.values(obj);
            var stocks = [...this.state.stocks];
            for (let i = 0; i < data.length; i++) {
              stocks[i] = {};
              stocks[i].name = data[i].name;
              stocks[i].symbol = data[i].symbol;
              stocks[i].max_supply = parseInt(data[i].max_supply);
              if (
                this.state.saveddata.find((obj) => obj.name === data[i].name)
              ) {
                stocks[i].existed = true;
              } else {
                stocks[i].existed = false;
              }
              stocks[i].id = i;
            }
            this.setState({ stocks });
            this.setState({ loading: false });
          });
      })

      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.loading) {
      return <></>;
    }
    return (
      <React.Fragment>
        <MainPage view={false} stocks={this.state.stocks} />
      </React.Fragment>
    );
  }
}
export default App;
