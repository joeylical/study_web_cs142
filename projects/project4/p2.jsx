import React from "react";
import ReactDOM from "react-dom";

import States from "./components/States";
import Banner from "./components/Header";

ReactDOM.render(
<div>
    <Banner />
    <div style={{marginTop: "60px"}}>
        <States  />
    </div>
</div>, document.getElementById("reactapp"));
