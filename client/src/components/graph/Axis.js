import React, { Component, useState, useEffect, useRef, useCallback } from 'react';
import {select } from "d3";
const Axis = ({axis, transform, scale}) =>{
    
    const ref = useRef(null)
    useEffect(() => {
        select(ref.current).call(scale);
      }, [])

    return(
        <g
            transform={transform}
            ref={ref}
        />
    );
};

export default Axis;