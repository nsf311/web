import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import BosMap from "./pages/BosMap";
import HeaderNav from "./layout/header";
import FooterNav from "./layout/footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutUs from "./pages/About-us";
import PageNotFound from "./pages/page-not-found";
import HomePage from "./pages/Home-page";
import PeoplePage from "./pages/People";

function App() {
  return (
    <div className="container-l">
      <HeaderNav />
        <main className="mb-auto h-100">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about">
              <AboutUs />
            </Route>
            <Route path="/map">
              <BosMap />
            </Route>
            <Route path="/people">
              <PeoplePage />
            </Route>
            <Route default>
              <PageNotFound />
            </Route>
          </Switch>
        </BrowserRouter>
        </main>
        <FooterNav />
    </div>
  );
}

export default App;
