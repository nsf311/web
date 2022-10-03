import React from "react";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";

export const SelectForms = ({ id, options, label, value, onChange }) => {
  const [selected, setSelected] = React.useState(value);
  const onChangeFunc = ({ target }) => {
    setSelected(target.value);
    onChange(target.value);
  };
  useEffect(() => {
    if (value !== selected) {
      setSelected(value);
    }
  }, [selected, value]);
  return (
    <div className="text-dark">
      <div className="form-group">
        <label htmlFor={id} className="fw-bold">
          {label}{" "}
        </label>
        <Form.Select
          className="form-control rounded-pill my-2"
          id={id}
          onChange={onChangeFunc}
          value={selected}
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
