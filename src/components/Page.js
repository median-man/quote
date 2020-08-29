import React from "react";
import defaultBgColors from "../defaultBgColors";
import styles from "./Page.module.css";

function renderBgImageGradient(bgColors) {
  return `linear-gradient(to right top, ${bgColors.join(",")})`;
}

export default function Page({ bgColors, children }) {
  return (
    <div
      style={{
        backgroundImage: renderBgImageGradient(bgColors || defaultBgColors),
      }}
      className={styles.page}
    >
      {children}
    </div>
  );
}
