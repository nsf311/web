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
        {profiles.map((profile, k) => (
          <>
            <div className="text-warning fs-5 fw-bold" key={'title' + k}>{profile.title}</div>
            <ul style={{ listStyleType: "circle" }} key={profile.title}>
              {profile.teams.map((member, i) => (
                <li className="my-2" key={i.toString()}>
                  {member.name} {member.school}
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </>
  );
}

export default PeoplePage;
