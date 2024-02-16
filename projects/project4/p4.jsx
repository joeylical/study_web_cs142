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
                        <Link to="/p4.html">Home</Link>
                    </li>
                    <li>
                        <Link to="/states">states</Link>
                    </li>
                    <li>
                        <Link to="/example">example</Link>
                    </li>
                </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/states">
                    <States />
                </Route>
                <Route path="/example">
                    <Example />
                </Route>
                <Route path="/p4.html">
                    <p>Home</p>
                </Route>
            </Switch>
        </div>
    </Router>
</div>, document.getElementById("reactapp"));
