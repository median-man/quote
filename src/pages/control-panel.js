import React, { useState } from "react";
import Page from "../components/Page";
import styles from "./control-panel.module.css";
import defaultBgColors from "../defaultBgColors";
import {
  ColorControl,
  ColorControlInput,
  ColorControlButton,
} from "../components/ColorControl";

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
      <fieldset className={styles.Fieldset}>
        <legend className={styles.Fieldset__Legend}>Background Colors</legend>
        <button onClick={addColor} className={styles.Fieldset__Button}>
          Add Color
        </button>
        <div className={styles.ColorBar}>
          {colors.map((color, index) => {
            return (
              <ColorControl key={color + index}>
                <ColorControlInput
                  color={color}
                  index={index}
                  onChange={handleColorInputChange}
                />
                <ColorControlButton value={index} onClick={removeColor} />
              </ColorControl>
            );
          })}
        </div>
      </fieldset>
    </Page>
  );
}
