import React from "react";
import PropTypes from "prop-types";
import defaultBgColors from "../defaultBgColors";
import styles from "./Layout.module.css";
import { useColorTheme } from "../colorThemeContext";

function renderBgImageGradient(bgColors) {
  return `linear-gradient(to right top, ${bgColors.join(",")})`;
}

export default function Layout({ children }) {
  const { bgColors } = useColorTheme();
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

Layout.propTypes = {
  bgColors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
