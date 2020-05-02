import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Providers from "./Providers";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>,
  rootElement
);
