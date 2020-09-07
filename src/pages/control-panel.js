import React, { useState } from "react";
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
import * as colorService from "../colorService";

export default function ControlPanel() {
  const [colors, setColors] = useState(colorService.bgColors());

  const syncColors = () => setColors(colorService.bgColors());

  const removeColor = (e) => {
    const index = parseInt(e.target.value);
    colorService.removeColorAt(index);
    syncColors();
  };

  const removeAllColors = () => {
    colorService.clear([]);
    syncColors();
  };

  const addColor = () => {
    colorService.pushColor("#888888");
    syncColors();
  };

  const handleColorInputChange = (e) => {
    const { value } = e.target;
    const { index } = e.target.dataset;
    colorService.setColorAt(index, value);
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
          {colors.map((color, index) => {
            // color input must be uncontrolled for color well to remain visible while user drags
            // the picker around on the well canvas. otherwise, calling render each time state changes
            // causes the picker to be removed from the dom when the input element is replaced.
            return (
              <ColorControl key={color + index}>
                <ColorControlInput
                  color={color}
                  index={index}
                  onInput={handleColorInputChange}
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
