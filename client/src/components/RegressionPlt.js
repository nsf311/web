import React from "react";

import { scaleLinear, max, min, axisLeft, axisBottom } from "d3";

import RenderCircles from "./graph/RenderCircles";
import Axis from "./graph/Axis";

const RegressionPlt = ({
  RegDataSelectedUser,
  RegDataDV,
  DVName,
  RegDataIV,
  IVName,
}) => {
  const getHexDV = (hexagon) => {
    if (hexagon[0] !== undefined) {
      return hexagon[0][RegDataDV];
    }
  };

  const getHexIV = (hexagon) => {
    if (hexagon[0] !== undefined) {
      return hexagon[0][RegDataIV];
    }
  };
  const getXYData = (x_data, y_data) => {
    const xy_data = [];
    for (let i = 0; i < x_data.length; i++) {
      if (typeof x_data[i] == "number" && typeof y_data[i] == "number") {
        xy_data.push({ x: x_data[i], y: y_data[i] });
      }
    }
    return xy_data;
  };
  // const listHex = RegDataSelectedUser.map( (d) => d.HEX_600);
  // const hexResults = RegDataSelectedUser.map( (d) => d.results);
  const variables_data = RegDataSelectedUser.map((d) => d.results);
  const hexDV = variables_data.map(getHexDV);
  const hexIV = variables_data.map(getHexIV);

  const margin = { top: 20, right: 30, bottom: 60, left: 60 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const x_axis = scaleLinear()
    .domain([min(hexIV), max(hexIV)])
    .range([0, width]);

  const y_axis = scaleLinear()
    .domain([min(hexDV), max(hexDV)])
    .range([height, 0]);

  const xy_data = getXYData(hexIV, hexDV);
  {
    /* {console.log(listHex)} */
  }
  {
    /* {JSON.stringify(allRegData)} */
  }
  {
    /* {JSON.stringify(hexResults)} */
  }
  {
    /* {allRegData.forEach(element => console.log(element))} */
  }
  {
    /* {console.log(variables_data)} */
  }
  {
    /* {console.log(x_axis)}
            {console.log(y_axis)} */
  }
  return (
    <div className="px-2">
      <h5 className="text-center border-bottom pb-2">
        {" "}
        <small className="text-primary">{DVName}</small> <strong>vs</strong>{" "}
        <small className="text-danger">{IVName}</small>
      </h5>
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
          <text textAnchor="end" x={width} y={height + margin.top + 10}>
            {IVName}
          </text>

          <Axis
            axis="y"
            transform={"translate(0,0)"}
            scale={axisLeft().scale(y_axis)}
          />
          <text textAnchor="end" x={-40} y={-47} transform="rotate(-90)">
            {DVName}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RegressionPlt;
