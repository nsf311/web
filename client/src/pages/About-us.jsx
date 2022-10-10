import React from "react";
import Helmet from "react-helmet";
export function AboutUs() {
  return (
    <>
      <Helmet>
        <title>Boston 311 | About</title>
      </Helmet>
      <div className="col-11 mx-auto p-4 about-background-right">
        <h2 className="mb-5 fw-bold">
          {" "}
          <span className="text-warning">ABOUT</span> BOSTON 311 INFORMATION
          DESERTS.
        </h2>
        <div className="m-2">
          <p className="fs-4 fw-bold mb-4">What is a information Desert?</p>
          <p className="fs-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            neque odit? Temporibus totam vitae corporis magnam eaque! Labore
            maxime porro ad voluptatem, voluptas deleniti quos reiciendis,
            nostrum non sunt ut.
          </p>
          <p className="fs-4 fw-bold mb-4 text-warning">What is a information Desert?</p>
          <p className="fs-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            facilis autem magni, sit voluptatem rem dignissimos dolor doloremque
            beatae reprehenderit repellendus cum, molestias quidem adipisci.
            Repudiandae qui odio sit vel.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
