import React from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";
import { initBgColors } from "../colorService";

export default function Layout({ children }) {
  initBgColors();
  return (
    <div className={styles.Page}>
      <div className={styles.Page__Content}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
