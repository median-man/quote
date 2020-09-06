import React from "react";
import { Link } from "gatsby";
import {
  Fieldset,
  FieldsetLegend,
  FieldsetButtonGroup,
} from "../components/Fieldset";
import styles from "./control-panel.module.css";
import {
  ColorControl,
  ColorControlInput,
  ColorControlButton,
} from "../components/ColorControl";
import { useColorTheme } from "../colorThemeContext";

export default function ControlPanel() {
  const { bgColors, setBgColors } = useColorTheme();

  const removeColor = (e) => {
    const index = parseInt(e.target.value);
    setBgColors((colors) =>
      colors.slice(0, index).concat(colors.slice(index + 1))
    );
  };

  const removeAllColors = () => setBgColors(["#999999"]);

  const addColor = () => {
    setBgColors((colors) => {
      const lastColor = colors[colors.length - 1];
      return [...colors, lastColor];
    });
  };

  const handleColorInputChange = (e) => {
    const { value } = e.target;
    const { index } = e.target.dataset;

    setBgColors((colors) => {
      const newColors = [...colors];
      newColors[index] = value;
      return newColors;
    });
  };

  return (
    <div>
      <Link to="/" style={{ marginBottom: "1.5em", display: "block" }}>
        Back to Quote
      </Link>
      <Fieldset>
        <FieldsetLegend>Background Colors</FieldsetLegend>
        <FieldsetButtonGroup>
          <button onClick={addColor}>Add Color</button>
          <button aria-label="clear all colors" onClick={removeAllColors}>
            Clear All
          </button>
        </FieldsetButtonGroup>
        <div className={styles.ColorBar}>
          {bgColors.map((color, index) => {
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
      </Fieldset>
    </div>
  );
}
