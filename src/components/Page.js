import React from "react";
import PropTypes from "prop-types";
import defaultBgColors from "../defaultBgColors";
import styles from "./Page.module.css";

function renderBgImageGradient(bgColors) {
  return `linear-gradient(to right top, ${bgColors.join(",")})`;
}

export default function Page({ bgColors, children }) {
  const style = {};
  if (!bgColors) {
    style.backgroundImage = renderBgImageGradient(defaultBgColors);
  } else if (bgColors.length > 1) {
    style.backgroundImage = renderBgImageGradient(bgColors);
  } else {
    style.backgroundColor = bgColors[0];
  }
  return (
    <div style={style} className={styles.Page}>
      <div className={styles.Page__Content}>{children}</div>
    </div>
  );
}

Page.propTypes = {
  bgColors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
