
import React from 'react';
import './Input.css';

function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        className="custom-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;