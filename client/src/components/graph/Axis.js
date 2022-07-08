import React, { Component, useState, useEffect,useLayoutEffect, useRef, useCallback } from 'react';
import {select } from "d3";
const Axis = ({axis, transform, scale}) =>{
    
    const ref = useRef(null);
 
    console.log(ref)
    // select(ref.current).call(scale);
    useEffect(() => {
        select(ref.current).call(scale);
      }, [scale])
      

    
    

    return(
        <g
            transform={transform}
            ref={ref}
        />
    );
};

export default Axis;