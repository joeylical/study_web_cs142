import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import States from "./components/States";
import Example from "./components/Example";
import Banner from "./components/Header";


ReactDOM.render(
<div>
    <Banner />
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/p5.html">Home</Link>
                    </li>
                    <li>
                        <Link to="/states">states</Link>
                    </li>
                    <li>
                        <Link to="/example">example</Link>
                    </li>
                </ul>
            </nav>

            {/* This is how to embedd css in react */}
            <div style={{marginTop: "60px"}}>
                <Switch>
                    <Route path="/states">
                        <States />
                    </Route>
                    <Route path="/example">
                        <Example />
                    </Route>
                    <Route path="/p5.html">
                        <p>Home</p>
                    </Route>
                </Switch>
            </div>
        </div>
    </Router>
</div>, document.getElementById("reactapp"));
