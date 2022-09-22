import React from "react";
// import { Button } from "react-bootstrap";
import Helmet from "react-helmet";
import { binoculars, map_img } from "../assets";
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Boston 311 | Homepage</title>
      </Helmet>
      <div className="col-11 mx-auto shadow-lg">
        <div className="row m-4">
          <div className="col-6 my-auto">
            <h2 className="text-start text-dark fs-1 fw-bold">
              MAKING <br /> INFORMATION DESERTS <br /> VISIBLE{" "}
              <span className="text-warning">.</span>
            </h2>
            <h3 className="pt-4">{"(Add short intro here)"}</h3>
          </div>
          <div className="col-6 text-end">
            <img src={binoculars} alt="binoculars" className="px-5" />
          </div>
          <div className="col-12 border-top border-bottom border-warning py-5 my-3 row">
            <div className="col-6">
              <img src={map_img} alt="map" className="px-5" />
            </div>
            <div className="col-6 text-end my-auto">
              <h2 className="text-dark fs-1 fw-bold">
                SOCIAL JUSTICE <br /> {" & "} TECHNICAL EFFICIENCY
                <span className="text-warning">.</span> <br />{" "}
                <span className="text-warning">WHAT DOES OUR MAP SHOW?</span>
              </h2>
            </div>
            <div className="text-end mt-5">
              <a
                className="btn btn-lg btn-warning text-white shadow"
                href="/map"
              >
                {" "}
                Go to map
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
