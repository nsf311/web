import React from "react";

export function PageNotFound() {
  return (
    <>
      <div className="col-11 mx-auto pt-5 p-4 shadow ">
        <h2 className="text-center text-warning fs-1">Oops! 404</h2>
        <p className="text-center fs-3">
          The page you are looking for does not exist.
        </p>
        <div className="text-end">
          <a className="btn btn-lg btn-warning text-white" href="/">
            Go to Homepage
          </a>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
