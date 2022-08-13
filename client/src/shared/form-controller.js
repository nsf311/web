import React from "react";
import Form from "react-bootstrap/Form";

export const SelectForms = ({ id, options, label, value, onChange }) => {
  const onChangeFunc = ({ target }) => {
    value = target.value;
    onChange(target.value);
  };
  return (
    <div className="text-dark">
      <div className="form-group">
        <label htmlFor={id} className="fw-bold">
          {label}:{" "}
        </label>
        <Form.Select
          className="form-control"
          id={id}
          onChange={onChangeFunc}
          value={value}
        >
          {options?.map((option, idx) => (
            <option key={idx} value={option.Value}>
              {option.Name}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};
// other Form will be added.

export default SelectForms;
