import React from "react";
import {
  userTypeDictObj,
  freqDictObj,
  ReasonDictObj,
} from "../core/constants/map-contants";
const HexRegression = ({ selectedHex, hexRegVars }) => {
  const hexRegVarsAll = hexRegVars.map((d) => d.results);

  return (
    <div>
      {!userTypeDictObj[
        hexRegVars[0] &&
          hexRegVars[0]["results"][0] &&
          hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
          hexRegVars[0]["results"][0]["user_type"]
      ] ? (
        <>
        <div className="border w-100 p-5 text-center h3 fw-light rounded">
            No Data Available for Hexagon number {selectedHex.properties.HEX_600} !!!
        </div>
        </>
      ) : (
        <>
        <table id="bostontable">
        <tr>
          <th>Label</th>
          <th>Result</th>
        </tr>
        <tr>
          <td>Hexagon number:</td>
          <td>{selectedHex?.properties?.HEX_600}</td>
        </tr>
        <tr>
          <td>Who Reported: </td>
          <td>
            {
              userTypeDictObj[
                hexRegVars[0] &&
                  hexRegVars[0]["results"][0] &&
                  hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
                  hexRegVars[0]["results"][0]["user_type"]
              ]
            }
          </td>
        </tr>
        <tr>
          <td>Repeated Users: </td>
          <td>
            {
              freqDictObj[
                hexRegVars[0] &&
                  hexRegVars[0]["results"][0] &&
                  hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
                  hexRegVars[0]["results"][0]["frequency"]
              ]
            }
          </td>
        </tr>
        <tr>
          <td> Report Type: </td>
          <td>
            {
              ReasonDictObj[
                hexRegVars[0] &&
                  hexRegVars[0]["results"][0] &&
                  hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
                  hexRegVars[0]["results"][0]["reason"]
              ]
            }
          </td>
        </tr>
        <tr>
          <td> Reporting Frequency (number of reports):</td>
          <td>
            {hexRegVars[0] &&
              hexRegVars[0]["results"][0] &&
              hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
              hexRegVars[0]["results"][0]["HEX_total_reporting"]}
          </td>
        </tr>
        <tr>
          <td> User Mobility (variations in reporting locations):</td>
          <td>
            {hexRegVars[0] &&
              hexRegVars[0]["results"][0] &&
              hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
              hexRegVars[0]["results"][0]["HEX_weighted_radius_of_gyration"]}
          </td>
        </tr>
        <tr>
          <td> Territoriality (distance from user’s home): </td>
          <td>
            {hexRegVars[0] &&
              hexRegVars[0]["results"][0] &&
              hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
              hexRegVars[0]["results"][0]["HEX_weighted_median_home_distance"]}
          </td>
        </tr>
        <tr>
          <td>Topic Variety (# of reporting types covered): </td>
          <td>
            {hexRegVars[0] &&
              hexRegVars[0]["results"][0] &&
              hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
              hexRegVars[0]["results"][0]["HEX_weighted_subject_coverage"]}
          </td>
        </tr>
        <tr>
          <td>User Volume (# of users per capita): </td>
          <td>
            {hexRegVars[0] &&
              hexRegVars[0]["results"][0] &&
              hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
              hexRegVars[0]["results"][0]["HEX_total_user"]}
          </td>
        </tr>
        <tr>
          <td>HEX poverty index: </td>
          <td>
            {hexRegVars[0] &&
              hexRegVars[0]["results"][0] &&
              hexRegVars[0]["HEX_600"] === selectedHex.properties.HEX_600 &&
              hexRegVars[0]["results"][0]["poverty_index"]}
          </td>
        </tr>
      </table></>
      )}
      

      {/* <p>
                <b>Hexagon number: </b>
                {selectedHex?.properties?.HEX_600}
            </p> */}
      {/* <p>
                <b># of 311: </b>
                {selectedHex && selectedHex.properties && selectedHex.properties.num_311}
            </p> */}

      {/* <p>
                <b>Who Reported:   {userTypeDictObj[hexRegVars[0]  && hexRegVars[0]['results'][0] && hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600
                && hexRegVars[0]['results'][0]['user_type']]}
                </b>
            </p> */}
      {/* just need the following 3 rows for debugging, will remove them ultimately */}
      {/* <p>
                <b>Repeated Users: </b>   
                {freqDictObj[hexRegVars[0] && hexRegVars[0]['results'][0] && hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 
                && hexRegVars[0]['results'][0]['frequency']]}
            </p>

            <p>
                <b> Report Type: </b>   
                {ReasonDictObj[hexRegVars[0] && hexRegVars[0]['results'][0] && hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 
                && hexRegVars[0]['results'][0]['reason']]}
            </p>

            <p>
                <b> Reporting Frequency (number of reports): </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_total_reporting']}
            </p>

            <p>
                <b> User Mobility (variations in reporting locations): </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_radius_of_gyration']}
            </p>

            <p>
                <b> Territoriality (distance from user’s home): </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_median_home_distance']}
            </p>

            <p>
                <b> Topic Variety (# of reporting types covered): </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_subject_coverage']}
            </p>

            <p>
                <b> User Volume (# of users per capita): </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_total_user']}
            </p>

            <p>
                <b> HEX poverty index: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['poverty_index']}
            </p> */}

      {/* <p>
                <b> HEX weighted average distance: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_average_distance']}
            </p>

            <p>
                <b> HEX weighted mean home distance: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_mean_home_distance']}
            </p>

            <p>
                <b> HEX weighted max distance: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_max_home_distance']}
            </p> */}

      {/* <p>
                <b> HEX weighted num reporting 2015: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_num_reporting_2015']}
            </p> */}

      {/* <p>
                <b> HEX weighted HEX coverage: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_HEX_coverage']}
            </p> */}

      {/* <p>
                <b> HEX weighted subject hhi: </b>
                {hexRegVars[0] && hexRegVars[0]['results'][0] &&
                    hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                    hexRegVars[0]['results'][0]['HEX_weighted_subject_hhi']}
            </p> */}
    </div>
  );
};

export default HexRegression;
