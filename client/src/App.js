import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import BosMap from "./components/BosMap";
import HeaderNav from "./layout/header";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutUs from "./pages/about-us";

function App() {
  return (
    <div className="App">
      <HeaderNav className="App-header" />
      <BrowserRouter>
        <Switch>
          <Route path="/about"><AboutUs /></Route>
          <Route default>
            <BosMap />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
