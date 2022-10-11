import React, { useEffect } from "react";

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
} from "../../core/constants/map-contants";

import Draggable from "react-draggable";

import { dragIcon } from "../.././assets";

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

const Legend = ({ maxDV, minDV, step, map, position }) => {
  const [pos, setPos] = React.useState(null);
  useEffect(() => {
    setPos(position);
  }, [position]);

  return (
    <div>
      <Draggable
        position={pos}
        onDrag={(e, trackp) => {
          setPos(null);
          map.dragging.disable();
        }}
        onStop={() => {
          map.dragging.enable();
        }}
      >
        <div className="legend shadow rounded-lg text-end">
          <img
            src={dragIcon}
            alt="drag legend"
            width={40}
            onDragStart={(e) => {
              e.preventDefault();
            }}
            className="rounded-start rounded-pill "
          />
          {COLORS.map((color, idx) => {
            return (
              <div key={idx} style={{ "--color": color }}>
                {Math.round(
                  ((maxDV - (idx + 1) * step + Number.EPSILON) * 100) / 100
                )}{" "}
                -{" "}
                {Math.round(
                  ((maxDV - idx * step + Number.EPSILON) * 100) / 100
                )}
              </div>
            );
          })}
          <div style={{ "--color": COLOR_1 }}>
            {" "}
            {0.0} -{" "}
            {Math.round(((maxDV - 6 * step + Number.EPSILON) * 100) / 100)}
          </div>
          <div style={{ "--color": COLOR_NULL }}>NULL</div>
          {/* <div className="py-4">
            <Button
              variant="danger rounded-pill btn-sm"
              className="my-2"
              onClick={() => {
                map?.setView([42.320081, -71.08], 12);
              }}
            >
              View Boston
            </Button>
          </div> */}
        </div>
      </Draggable>
    </div>
  );
};

export default Legend;
