import React from "react";

export function PageNotFound() {
  return (
    <>
      <div className="container-xl px-3 px-md-4 px-lg-5 mt-4">
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
