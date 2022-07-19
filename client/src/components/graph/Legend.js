import React, { Component, useState } from 'react';
import "leaflet/dist/leaflet.css";
// import * as d3 from "d3";
const COLOR_1 = "#ffe6e6";
const COLOR_2 = "#ffb6b6";
const COLOR_3 = "#ff8686";
const COLOR_4 = "#ff5656";
const COLOR_5 = "#ff2626";
const COLOR_6 = "#ff0000";
const COLOR_7 = "#f00000";
const COLOR_8 = "#d00000";
const COLOR_9 = "#b00000";
const COLOR_10 = "#900000";
const COLOR_11 = "#700000";
const COLOR_NULL = "#ffffff";
const Legend = ({maxDV, minDV, step}) => {

    return(
        <div className="legend">
            <div style={{ "--color": COLOR_11 }}>{maxDV - 1 * step} - {maxDV}</div>
            <div style={{ "--color": COLOR_10 }}>{maxDV - 2 * step} - {maxDV - 1 * step}</div>
            <div style={{ "--color": COLOR_9 }}>{maxDV - 3 * step} - {maxDV - 2 * step}</div>
            <div style={{ "--color": COLOR_8 }}>{maxDV - 5 * step} - {maxDV - 4 * step}</div>
            <div style={{ "--color": COLOR_7 }}>{maxDV - 6 * step} - {maxDV - 5 * step}</div>
            <div style={{ "--color": COLOR_6 }}>{maxDV - 7 * step} - {maxDV - 6 * step}</div>
            <div style={{ "--color": COLOR_5 }}>{maxDV - 8 * step} - {maxDV - 7 * step}</div>
            <div style={{ "--color": COLOR_4 }}>{maxDV - 9 * step} - {maxDV - 8 * step}</div>
            <div style={{ "--color": COLOR_3 }}>{maxDV - 10 * step} - {maxDV - 9 * step}</div>
            <div style={{ "--color": COLOR_2 }}>{maxDV - 11 * step} - {maxDV - 10 * step}</div>
            <div style={{ "--color": COLOR_1 }}> {minDV}</div>
            <div style={{ "--color": COLOR_NULL }}>NULL</div>
        </div>
       
    );
};

export default Legend;