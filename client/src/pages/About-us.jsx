import React from "react";
import Helmet from "react-helmet";
export function AboutUs() {
  return (
    <>
      <Helmet>
        <title>Boston 311 | About</title>
      </Helmet>
      <div className="container-xl px-3 px-md-4 px-lg-5 mt-4">
        <h2 className="mb-5 fw-bold">
          {" "}
          <span className="text-warning">ABOUT</span> BOSTON 311 INFORMATION
          DESERTS.
        </h2>
        <div className="m-2">
          <p className="fs-4 fw-bold mb-4 text-warning">What Is an Information Desert?</p>
          <p className="fs-5">
            An information desert describes a condition where the information
            available in a local community is structurally inadequate for
            meeting residents' needs. It goes beyond a simple lack of
            information. In an information desert, local information may be
            fragmented across too many disconnected sources, making it difficult
            for people to piece together what they need. It may also be
            transient, appearing briefly and disappearing before residents can
            act on it. These structural problems — scarcity, fragmentation, and
            transience — together create an environment where people struggle to
            stay informed, even when information technically exists somewhere.
          </p>
          <p className="fs-5">
            Information deserts tend to overlap with socioeconomic disadvantages.
            Communities with fewer resources often have weaker information
            infrastructures, which in turn limits residents' ability to
            participate in civic life, access public services, or advocate for
            their neighborhoods.
          </p>

          <p className="fs-4 fw-bold mb-4 text-warning">
            Why Do Information Deserts Matter in 311 Systems?
          </p>
          <p className="fs-5">
            311 systems allow residents to report non-emergency issues like
            potholes, broken streetlights, and noise complaints to their city
            government. These reports are increasingly used by city officials to
            allocate resources and prioritize services. However, not all
            neighborhoods use 311 equally. Differences in technology access,
            digital literacy, and community norms mean that some areas generate
            far more reports than others. When cities rely on this data for
            decision-making without accounting for these disparities, they risk
            directing services toward already well-served areas while
            overlooking communities that need help the most.
          </p>
          <p className="fs-5">
            This platform visualizes these patterns in Boston's 311 data,
            helping researchers, city officials, and residents understand where
            information deserts exist and how they shape the delivery of public
            services.
          </p>

          <p className="fs-4 fw-bold mb-4 text-warning">Our Research</p>
          <p className="fs-5">
            This project is a result of research led by the{" "}
            <a
              href="https://cil.cec.gmu.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community Informatics Lab (CIL)
            </a>{" "}
            at George Mason University, in collaboration with the University of
            Maryland, Arizona State University, and Emerson College. Our team
            combines computational methods with qualitative research to
            understand how civic technologies shape local information
            landscapes and how disparities in technology use become embedded in
            urban decision-making.
          </p>

          <p className="fs-4 fw-bold mb-4 text-warning">Acknowledgment</p>
          <p className="fs-5">
            This material is based upon work supported by the National Science
            Foundation under Grant No.{" "}
            <a
              href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1816763"
              target="_blank"
              rel="noopener noreferrer"
            >
              1816763
            </a>{" "}
            ("CHS: Small: Collaborative Research: Making Information Deserts
            Visible: Computational Models, Disparities in Civic Technology Use,
            and Urban Decision Making," 2018–2022). Any opinions, findings, and
            conclusions or recommendations expressed in this material are those
            of the author(s) and do not necessarily reflect the views of the
            National Science Foundation.
          </p>

          <p className="fs-4 fw-bold mb-4 text-warning">Selected Publications</p>
          <ul className="fs-6">
            <li className="mb-3">
              Lee, M., Butler, B.S. (2019). "How are Information Deserts Created? A Theory of Local Information Landscapes."{" "}
              <em>Journal of the Association for Information Science and Technology (JASIST)</em>, 70(2), pp. 101-119.{" "}
              <a href="https://doi.org/10.1002/asi.24114" target="_blank" rel="noopener noreferrer">doi.org/10.1002/asi.24114</a>
            </li>
            <li className="mb-3">
              Lee, M., Harlow, J., Gordon, E., Wang, J., Johnston, E., Janzen, S., Winter, S. (2020). "Toward Understanding Civic Data Bias in 311 Systems: An Information Deserts Perspective."{" "}
              <em>CSCW Workshop on Civic Technologies</em>.{" "}
              <a href="https://arxiv.org/pdf/2012.00515.pdf" target="_blank" rel="noopener noreferrer">arxiv.org/pdf/2012.00515</a>
            </li>
            <li className="mb-3">
              Lee, M., Wang, J., Janzen, S., Winter, S., Harlow, J. (2021). "Crowdsourcing Behavior in Reporting Civic Issues: The Case of Boston's 311 Systems."{" "}
              <em>Academy of Management Annual Meeting Proceedings (AOM '21)</em>.{" "}
              <a href="https://doi.org/10.5465/AMBPP.2021.16532abstract" target="_blank" rel="noopener noreferrer">doi.org/10.5465/AMBPP.2021.16532abstract</a>
            </li>
            <li className="mb-3">
              Hsu, J. H-P., Wang, J., Lee, M. (2022). "Towards an Expectation-Oriented Model of Public Service Quality: A Preliminary Study of NYC 311."{" "}
              <em>International Conference on Social Informatics (SocInfo '22)</em>. Springer.{" "}
              <a href="https://doi.org/10.1007/978-3-031-19097-1_31" target="_blank" rel="noopener noreferrer">doi.org/10.1007/978-3-031-19097-1_31</a>
            </li>
            <li className="mb-3">
              Wang, P., Lee, M., Hangen, F., O'Brien, D., Tang, X. (2022). "Social Justice &amp; Technical Efficiency: The Role of Digital Technology in Boston's 311 System."{" "}
              <em>European Conference on Information Systems (ECIS '22)</em>.{" "}
              <a href="https://aisel.aisnet.org/ecis2022_rp/117" target="_blank" rel="noopener noreferrer">aisel.aisnet.org/ecis2022_rp/117</a>{" "}
              — Best Full Paper Runner-Up (top 3)
            </li>
            <li className="mb-3">
              Lee, M., Tang, X., Wang, P. (2023). "The NYC311 App &amp; Community Engagement in Coproducing Municipal Services."{" "}
              <em>Americas Conference on Information Systems (AMCIS '23)</em>.{" "}
              <a href="https://aisel.aisnet.org/amcis2023/sig_egov/sig_egov/12" target="_blank" rel="noopener noreferrer">aisel.aisnet.org/amcis2023</a>{" "}
              — Top 25% Papers
            </li>
            <li className="mb-3">
              Gordon, E., Harlow, J., Whitman, S., Lee, M. (2024). "Data Discretion: Screen-Level Bureaucrats and Municipal Decision-Making."{" "}
              <em>Digital Government: Research and Practice (DGOV)</em>, 5(2), pp. 1-14. ACM.{" "}
              <a href="https://doi.org/10.1145/3652950" target="_blank" rel="noopener noreferrer">doi.org/10.1145/3652950</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
