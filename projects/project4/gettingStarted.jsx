import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";

import Example from "./components/Example";
import Banner from "./components/Header";

ReactDOM.render(<Banner />, document.getElementById("banner"));
ReactDOM.render(<Example />, document.getElementById("reactapp"));