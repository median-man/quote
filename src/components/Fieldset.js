import React from "react";
import PropTypes from "prop-types";
import styles from "./Fieldset.module.css";

export function Fieldset({ children }) {
  return <fieldset className={styles.Fieldset}>{children}</fieldset>;
}

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
};

export function FieldsetButtonGroup({ children }) {
  return <div className={styles.Fieldset__ButtonGroup}>{children}</div>;
}

FieldsetButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export function FieldsetLegend({ children }) {
  return <legend className={styles.Fieldset__Legend}>{children}</legend>;
}

FieldsetLegend.propTypes = {
  children: PropTypes.node.isRequired,
};
