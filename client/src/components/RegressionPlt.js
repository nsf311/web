import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "leaflet/dist/leaflet.css";
// import * as d3 from "d3";
import { scaleLinear, max, min, axisLeft, axisBottom, select } from "d3";
import RenderCircles from './graph/RenderCircles';
import Axis from './graph/Axis';

const RegressionPlt = ({RegDataSelectedUser}) => {
   

    function getPovertyIndex(hexagon){
       if (hexagon[0]!==undefined){
           return hexagon[0].poverty_index;
       }
       
    }
    function getHexTotalReporting(hexagon){
        if (hexagon[0] !==undefined){
            return hexagon[0]["HEX_total_reporting"];
        }
    }
    function getXYData(x_data, y_data){
        const xy_data = [];

        for (let i = 0; i < x_data.length; i++) {
            xy_data.push([x_data[i],y_data[i]] );
        }
        return xy_data;
    }
    const listHex = RegDataSelectedUser.map( (d) => d.HEX_600);
    const hexResults = RegDataSelectedUser.map( (d) => d.results);
    const variables_data = RegDataSelectedUser.map((d) => d.results)

    const poverty_index_data = variables_data.map(getPovertyIndex);
    const total_reporting_data = variables_data.map(getHexTotalReporting);

    const margin = { top: 20, right: 15, bottom: 60, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    
    
    const x_axis = scaleLinear()
      .domain([
        min(poverty_index_data),
        max(poverty_index_data)
      ])
      .range([0, width])

      const y_axis = scaleLinear()
      .domain([
        0,
        max(total_reporting_data)
      ])
      .range([height, 0])
    let xy_data = getXYData(poverty_index_data, total_reporting_data)

    return (
        <div>
            {/* {console.log(listHex)} */}
            {/* {JSON.stringify(allRegData)} */}
            {/* {JSON.stringify(hexResults)} */}
            {/* {allRegData.forEach(element => console.log(element))} */}
            {console.log(variables_data)}
            {console.log(poverty_index_data)}
            {console.log(total_reporting_data)}

            {/* {console.log(allHeavyUsers)} */}
        <h3> Scatter Plot </h3>
        <svg
          width={width + margin.right + margin.left}
          height={height + margin.top + margin.bottom}
          className="chart"
        >
          <g
            transform={"translate(" + margin.left + "," + margin.top + ")"}
            width={width}
            height={height}
            className="main"
          >
            <RenderCircles data={xy_data} scale={{ x_axis, y_axis }} />
            <Axis
              axis="x"
              transform={"translate(0," + height + ")"}
              scale={axisBottom().scale(x_axis)}
            />
            <Axis
              axis="y"
              transform={"translate(0,0)"}
              scale={axisLeft().scale(y_axis)}
            />
          </g>
        </svg>
      </div>

      );
};

export default RegressionPlt;