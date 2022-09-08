import React from "react";
import { Helmet } from "react-helmet";

import {PROFILE} from "../core/constants/profile-constant";
export function PeoplePage() {
  const profiles = PROFILE;
  return (
    <>
      <Helmet>
        <title>Boston 311 | People</title>
      </Helmet>
      <div className="col-11 mx-auto shadow p-4">
        <h2 className="mb-5 fw-bold">
          MEET THE <span className="text-warning">PEOPLE</span> BEHIND <br />{" "}
          BOSTON 311 INFORMATION DESERTS.
        </h2>
        <div className="m-4 pt-5 h-100">
          <div className="row px-5 mx-5 h-100">
            {profiles.map((profile) => (
            <div className="col col-lg-3 mx-auto mb-4">
              <div className="border rounded-xxl shadow m-3 p-3 h-100 border-warning">
                <div className="text-center my-4">
                  <img
                    src={profile.image}
                    alt={profile.name + " profile"}
                    className="rounded-circle"
                    width={200}
                    height={200}
                  />
                </div>
                <p className="fs-5 fw-bold mb-4">
                  {profile.name}
                </p>
                <p className="fs-6">
                  {profile.intro}
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PeoplePage;
