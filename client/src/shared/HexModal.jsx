import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { SelectForms } from "../shared/form-controller";
import HexRegression from "../shared/HexRegression";

function HexModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center text-warning"
        >
          Hexagon {props?.selectedHex?.properties?.HEX_600}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-3">
          <HexRegression
            selectedHex={props.selectedHex}
            hexRegVars={props.hexRegVars}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default HexModal;

export { HexModal };
