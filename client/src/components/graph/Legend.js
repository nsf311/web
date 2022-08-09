import React from 'react';

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
            <div style={{ "--color": COLOR_11 }}>{Math.round( (maxDV - 1 * step + Number.EPSILON) * 100) / 100} - {Math.round( (maxDV + Number.EPSILON) * 100) / 100}</div>
            <div style={{ "--color": COLOR_10 }}>{Math.round( (maxDV - 2 * step + Number.EPSILON) * 100)/100} - {Math.round((maxDV - 1 * step + Number.EPSILON) * 100) / 100}</div>
            <div style={{ "--color": COLOR_9 }}>{Math.round( (maxDV - 3 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 2 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_8 }}>{Math.round( (maxDV - 4 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 3 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_7 }}>{Math.round( (maxDV - 5 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 4 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_6 }}>{Math.round( (maxDV - 6 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 5 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_5 }}>{Math.round( (maxDV - 7 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 6 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_4 }}>{Math.round( (maxDV - 8 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 7 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_3 }}>{Math.round( (maxDV - 9 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 8 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_2 }}>{Math.round( (maxDV - 10 * step + Number.EPSILON) * 100)/100} - {Math.round( (maxDV - 9 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_1 }}> {0.00} - {Math.round( (maxDV - 10 * step + Number.EPSILON) * 100)/100}</div>
            <div style={{ "--color": COLOR_NULL }}>NULL</div>
        </div>
       
    );
};

export default Legend;