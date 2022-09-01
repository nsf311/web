import React from "react";
import logo from "../assets/logo.png";
export const HeaderNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow col-11 mx-auto">
      <a className="navbar-brand text-shadow text-warning fw-bold fs-5 px-4" href="/">
        <img src={logo} alt="logo"/>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item border-start border-warning px-4">
            <a className="nav-link fs-4" href="/map">
              Map
            </a>
          </li>
          <li className="nav-item border-start border-warning px-4">
            <a className="nav-link fs-4" href="/about">
              About
            </a>
          </li>
          <li className="nav-item border-start border-warning px-4">
            <a className="nav-link fs-4" href="/people">
              People
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderNav;
