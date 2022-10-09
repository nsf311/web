import React, { useState } from "react";
import { logo } from "../assets";
import Offcanvas from "react-bootstrap/Offcanvas";
export const HeaderNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a
        className="navbar-brand text-shadow text-warning fw-bold fs-5 px-4"
        href="/"
      >
        <img src={logo} width="250" className="img-fluid" alt="logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleShow}
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <a
              className="navbar-brand text-shadow text-warning fw-bold fs-5 px-4 img-fluid"
              href="/"
            >
              <img src={logo} width="300" alt="logo" />
            </a>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item border-start border-warning px-4 my-2">
              <a className="nav-link fs-4 navlinks" href="/map">
                Map
              </a>
            </li>
            <li className="nav-item border-start border-warning px-4 my-2">
              <a className="nav-link fs-4 navlinks" href="/about">
                About
              </a>
            </li>
            <li className="nav-item border-start border-warning px-4 my-2">
              <a className="nav-link fs-4 navlinks" href="/people">
                People
              </a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
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
