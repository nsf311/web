import React from "react";
import { Helmet } from "react-helmet";

import { PROFILE } from "../core/constants/profile-constant";
export function PeoplePage() {
  const profiles = PROFILE;
  return (
    <>
      <Helmet>
        <title>Boston 311 | People</title>
      </Helmet>
      <div className="container-xl px-3 px-md-4 px-lg-5 mt-4">
        <h2 className="mb-4 fw-bold">
          MEET THE <span className="text-warning">PEOPLE</span> BEHIND <br />{" "}
          BOSTON 311 INFORMATION DESERTS.
        </h2>
        {profiles.map((profile) => (
          <div className="my-2">
            {" "}
            <span className="text-warning fs-4 fw-bold">
              {profile.name},
            </span>{" "}
            <span className="fs-6">{profile.intro}</span>{" "}
          </div>
        ))}
      </div>
    </>
  );
}

export default PeoplePage;
