import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import BosMap from "./pages/BosMap";
import HeaderNav from "./layout/header";
import FooterNav from "./layout/footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutUs from "./pages/about-us";

function App() {
  return (
    <>
      <HeaderNav />
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Switch>
            <Route path="/about">
              <AboutUs />
            </Route>
            <Route default>
              <BosMap />
            </Route>
          </Switch>
        </BrowserRouter>
        <div className="mt-auto">
          <FooterNav />
        </div>
      </div>
    </>
  );
}

export default App;
