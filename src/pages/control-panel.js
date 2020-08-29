import React, { useState } from "react";
import Page from "../components/Page";
import styles from "./control-panel.module.css";
import defaultBgColors from "../defaultBgColors";

export default function ControlPanel() {
  const [colors, setColors] = useState(defaultBgColors);

  const removeColor = (e) => {
    const index = parseInt(e.target.value);
    setColors((colors) =>
      colors.slice(0, index).concat(colors.slice(index + 1))
    );
  };

  const addColor = () => {
    setColors((colors) => {
      const lastColor = colors[colors.length - 1];
      return [...colors, lastColor];
    });
  };

  const handleColorInputChange = (e) => {
    const { value } = e.target;
    const { index } = e.target.dataset;

    setColors((colors) => {
      const newColors = [...colors];
      newColors[index] = value;
      return newColors;
    });
  };

  return (
    <Page bgColors={colors}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.fieldset__legend}>Background Colors</legend>
        {colors.map((color, index) => {
          return (
            <div className={styles.colorControl} key={color + index}>
              <label className={styles.colorControl__label}>
                Color {index + 1}:
              </label>
              <input
                className={styles.colorControl__input}
                type="color"
                defaultValue={color}
                data-index={index}
                onChange={handleColorInputChange}
              />
              <button
                aria-label="remove color"
                value={index}
                onClick={removeColor}
                className={styles.colorControl__btn}
              >
                &times;
              </button>
            </div>
          );
        })}
        <button onClick={addColor} className={styles.fieldset__button}>
          Add Color
        </button>
      </fieldset>
    </Page>
  );
}
