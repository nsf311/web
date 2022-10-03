import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { SelectForms } from "../shared/form-controller";
import HexRegression from "../shared/HexRegression";

function HexModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center text-warning"
        >
          Hexagon Subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 col-lg-6 border-end border-warning">
            <div className="col-12 mx-auto my-3">
              <SelectForms
                options={props.ReasonDict}
                label="Report Type:"
                onChange={props.setReason}
                value={props.selectedReason}
              ></SelectForms>
            </div>
            <div className="col-12 mx-auto my-3">
              <SelectForms
                options={props.userTypeDict}
                label="Who Reported?"
                onChange={props.setUser}
                value={props.selectedUser}
              ></SelectForms>
            </div>
            <div className="col-12 mx-auto my-3">
              <SelectForms
                options={props.freqDict}
                label="Repeated Users"
                onChange={props.setFrequency}
                value={props.selectedFrequency}
              ></SelectForms>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 overflow-auto"
            style={{ height: "600px" }}
          >
            <div className="col-12 mx-auto my-3">
              <HexRegression
                selectedHex={props.selectedHex}
                hexRegVars={props.hexRegVars}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default HexModal;

export { HexModal };
