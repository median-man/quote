import React from "react";
import PropTypes from "prop-types";
import styles from "./QuoteGroup.module.css";

const Container = ({ label, children }) => {
  return (
    <div className={styles.QuoteGroup} role="group" aria-label={label}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  label: PropTypes.string.isRequired,
};

const Heading = ({ children }) => {
  return <h3 className={styles.QuoteGroup__Heading}>{children}</h3>;
};

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const RemoveButton = ({ index, onClick }) => {
  return (
    <button
      className={styles.QuoteGroup__RemoveButton}
      aria-label={`remove quote ${index + 1}`}
      onClick={onClick}
      value={index}
    >
      <span aria-hidden={true}>&times;</span>
    </button>
  );
};

RemoveButton.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Label = ({ children }) => {
  return <label className={styles.QuoteGroup__Label}>{children}</label>;
};
Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Input = ({ index, label, name, onChange, type, value }) => {
  return (
    <Label>
      {label}
      <br />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        data-index={index}
        className={styles.QuoteGroup__Input}
      />
    </Label>
  );
};

Input.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Textarea = ({ index, label, name, onChange, value }) => {
  return (
    <Label>
      {label}
      <br />
      <textarea
        name={name}
        onChange={onChange}
        data-index={index}
        className={styles.QuoteGroup__Textarea}
        value={value}
      />
    </Label>
  );
};

Textarea.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default { Container, Heading, RemoveButton, Input, Textarea };
