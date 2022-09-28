import React from 'react';
import { userTypeDictObj, freqDictObj, ReasonDictObj } from '../core/constants/map-contants';
const HexRegression = ({ selectedHex, hexRegVars }) => {
    const hexRegVarsAll = hexRegVars.map((d) => d.results)
   
    return (
        <div>

            <p>
                <b>Hexagon number: </b>
                {selectedHex?.properties?.HEX_600}
            </p>
            {/* <p>
                <b># of 311: </b>
                {selectedHex && selectedHex.properties && selectedHex.properties.num_311}
            </p> */}

            <p>
                <b>Who Reported:   {userTypeDictObj[hexRegVars[0]  && hexRegVars[0]['results'][0] && hexRegVars[0]['HEX_600'] === selectedHex.properties.HEX_600
                && hexRegVars[0]['results'][0]['user_type']]}
                </b>
            </p>
        {/* just need the following 3 rows for debugging, will remove them ultimately */}
            <p>
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
                <b> User Mobility (variations in reporting locations: </b>
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
            </p>
            
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