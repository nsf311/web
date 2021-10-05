import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "leaflet/dist/leaflet.css";

const HexRegression = ({ selectedHex, regressionData }) => {
    return (
        <div>
            {console.log(regressionData)}
            <p>
                <b># of 311: </b>
                {selectedHex && selectedHex.properties && selectedHex.properties.num_311}
                {/* {console.log(regressionData)} */}
            </p>

            <p>
                <b>User type:   {regressionData[0]  && regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600
                && regressionData[0]['results'][0]['user_type']}
                </b>
            </p>

            <p>
                <b> Frequency </b>   
                {regressionData[0] && regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 
                && regressionData[0]['results'][0]['frequency']}
            </p>
            
            <p>
                <b> HEX weighted average distance: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_average_distance']}
            </p>

            <p>
                <b> HEX weighted mean home distance: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_mean_home_distance']}
            </p>

            <p>
                <b> HEX weighted max distance: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_max_home_distance']}
            </p>

            <p>
                <b> HEX weighted median distance: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_median_home_distance']}
            </p>
            
            <p>
                <b> HEX weighted radius of gyration: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_radius_of_gyration']}
            </p>

            <p>
                <b> HEX weighted num reporting 2015: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_num_reporting_2015']}
            </p>

            <p>
                <b> HEX weighted HEX coverage: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_HEX_coverage']}
            </p>

            <p>
                <b> HEX weighted subject coverage: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_subject_coverage']}
            </p>

            <p>
                <b> HEX weighted subject hhi: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_weighted_subject_hhi']}
            </p>

            <p>
                <b> HEX total reporting: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_total_reporting']}
            </p>

            <p>
                <b> HEX total user: </b>
                {regressionData[0] && 
                regressionData[0]['HEX_600'] === selectedHex.properties.HEX_600 && 
                regressionData[0]['results'][0]['HEX_total_user']}
            </p>

        </div>
      );
};

export default HexRegression;