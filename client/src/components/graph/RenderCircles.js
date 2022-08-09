import React from 'react';
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";
import * as d3r from "d3-regression"
const RenderCircles = ({data, scale}) => {
  const loessRegression = d3r.regressionLoess()
  .x(d => d.x)
  .y(d => d.y)
  .bandwidth(0.25);
  
  const lineGenerator = d3.line()
  .x(d => scale.x_axis(d[0]))
  .y(d => scale.y_axis(d[1]));

  return(
        <g>
            {data.map( (coord, i) => (
            <circle
              cx={scale.x_axis(coord.x)}
              cy={scale.y_axis(coord.y)}
              r="2"
              style={{ fill: "rgba(25, 158, 199, .9)" }}
              key={i}
            />
            
            ))}
            <path className=  "regression"  d = {lineGenerator(loessRegression(data))} />
          
        </g>
       
  );
};

export default RenderCircles;