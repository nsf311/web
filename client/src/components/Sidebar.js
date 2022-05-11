import React, { Component, useState } from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import HexRegression from './HexRegression';

const Sidebar = ({show, onHide, selectedHex, regressionData}) => {
    // const [showOffcanvas, setShowOffcanvas] = useState(false);
    // const handleOffcanvasClose = () => setShowOffcanvas(false);
    // const handleOffcanvasShow = () => setShowOffcanvas(true);

    return (
        <Offcanvas show={show} onHide={onHide} placement='end'>
            <OffcanvasHeader closeButton>
                <OffcanvasTitle>Hexagon Regression</OffcanvasTitle>
            </OffcanvasHeader>
            
            <OffcanvasBody>
                <HexRegression selectedHex = {selectedHex} regressionData = {regressionData} />
                
            </OffcanvasBody>
        </Offcanvas>
    )
} 