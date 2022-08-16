import React from "react";

import { Button } from "react-bootstrap";
import {
  COLOR_11,
  COLOR_10,
  COLOR_9,
  COLOR_8,
  COLOR_7,
  COLOR_6,
  COLOR_5,
  COLOR_4,
  COLOR_3,
  COLOR_2,
  COLOR_1,
  COLOR_NULL,
} from "../../core/map-contants";

const COLORS = [
  COLOR_11,
  COLOR_10,
  COLOR_9,
  COLOR_8,
  COLOR_7,
  COLOR_6,
  COLOR_5,
  COLOR_4,
  COLOR_3,
  COLOR_2,
];

const reloadMap = () => {
  window.location.reload();
};

const Legend = ({ maxDV, minDV, step }) => {
  return (
    <div className="legend shadow rounded-lg">
      {COLORS.map((color, idx) => {
        return (
          <div key={idx} style={{ "--color": color }}>
            {Math.round((maxDV - (idx + 1) * step + Number.EPSILON) * 100) /
              100}{" "}
            - {Math.round((maxDV - idx * step + Number.EPSILON) * 100) / 100}
          </div>
        );
      })}
      <div style={{ "--color": COLOR_1 }}>
        {" "}
        {0.0} - {Math.round((maxDV - 10 * step + Number.EPSILON) * 100) / 100}
      </div>
      <div style={{ "--color": COLOR_NULL }}>NULL</div>
      <Button
        variant="danger rounded-pill"
        className="my-3"
        onClick={reloadMap}
      >
        Refresh
      </Button>
      {/* Future development */}
      {/* <div className="container"></div> */}
    </div>
  );
};

export default Legend;
