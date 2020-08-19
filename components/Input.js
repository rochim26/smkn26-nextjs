import React from "react";

const Input = ({ type, id, value, onChange, label }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type={type || "text"}
          className="form-control"
          id={id}
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  );
};

export default Input;
