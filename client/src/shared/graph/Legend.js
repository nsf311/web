import React, { useEffect } from "react";
import {
  COLOR_7,
  COLOR_6,
  COLOR_5,
  COLOR_4,
  COLOR_3,
  COLOR_2,
  COLOR_1,
  COLOR_NULL,
} from "../../core/constants/map-contants";

const COLORS = [
  // COLOR_11,
  // COLOR_10,
  // COLOR_9,
  // COLOR_8,
  COLOR_7,
  COLOR_6,
  COLOR_5,
  COLOR_4,
  COLOR_3,
  COLOR_2,
];

const Legend = ({ maxDV, minDV, step, map, position, DVName }) => {
  const [pos, setPos] = React.useState(null);
  useEffect(() => {
    setPos(position);
  }, [position]);

  return (
    <>
      <div className="legend shadow rounded-lg">
        <h6 className="text-center fs-6 text-warning mx-2"># of {DVName}</h6>
        {COLORS.map((color, idx) => {
          return (
            <div key={idx} style={{ "--color": color }} className="text-white">
              {Math.round(
                ((maxDV - (idx + 1) * step + Number.EPSILON) * 100) / 100
              )}{" "}
              -{" "}
              {Math.round(((maxDV - idx * step + Number.EPSILON) * 100) / 100)}
            </div>
          );
        })}
        <div style={{ "--color": COLOR_1 }} className="text-white">
          {" "}
          {0.0} -{" "}
          {Math.round(((maxDV - 6 * step + Number.EPSILON) * 100) / 100)}
        </div>
        <div style={{ "--color": COLOR_NULL }} className="text-white">
          NULL
        </div>
      </div>
    </>
  );
};

export default Legend;
