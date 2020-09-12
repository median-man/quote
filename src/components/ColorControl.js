import React from "react";
import PropTypes from "prop-types";
import styles from "./ColorControl.module.css";

export function ColorControl({ children }) {
  return <div className={styles.ColorControl}>{children}</div>;
}

export function ColorControlInput({ color, index, onInput, id }) {
  return (
    <input
      id={id}
      className={styles.ColorControl__Input}
      type="color"
      defaultValue={color}
      data-index={index}
      onInput={onInput}
    />
  );
}
ColorControlInput.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string,
  index: PropTypes.number,
  onInput: PropTypes.func.isRequired,
};

export function ColorControlButton({ value, onClick }) {
  return (
    <button
      aria-label="remove color"
      value={value}
      onClick={onClick}
      className={styles.ColorControl__Button}
    >
      &times;
    </button>
  );
}
ColorControlButton.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
