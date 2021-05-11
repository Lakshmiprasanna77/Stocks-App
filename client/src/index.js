import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import View from "./routes/view.js";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route path="/view" component={View} />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
