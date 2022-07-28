import React, { Component, useState } from 'react';
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";
const RenderCircles = ({data, scale, regressionGenerator, line}) => {

    return(
        <g>
            {data.map( (coords, i) => (
            <circle
              cx={scale.x_axis(coords[0])}
              cy={scale.y_axis(coords[1])}
              r="3"
              style={{ fill: "rgba(25, 158, 199, .9)" }}
              key={i}
            />
            
          ))}
            {/* {data.map( (coords, i) =>(
              
              <path d={d3.line()
              .x(scale.x_axis(coords[0]))
              .y(scale.y_axis(coords[1]))} 
              fill="none" stroke="red" />
            ))} */}
            <path fill="none" stroke="red" d = {line} datum={regressionGenerator(data)}/>
          
        </g>
       
    );
};

export default RenderCircles;