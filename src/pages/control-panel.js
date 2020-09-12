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
import { useQuotes, PATCH_QUOTE, REMOVE_QUOTE, NEW_QUOTE } from "../quotes";
import QuoteGroup from "../components/QuoteGroup";

export default function ControlPanel() {
  const [colors, setColors] = useState(colorService.bgColors());
  const { quotes, dispatch } = useQuotes();

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

  const handleFontColorChange = (e) =>
    colorService.setFontColor(e.target.value);

  const handleQuoteInputChange = (e) => {
    const { name, value } = e.target;
    const index = parseInt(e.target.getAttribute("data-index"));
    console.log({ name, value, index });
    dispatch({ type: PATCH_QUOTE, index, update: { [name]: value } });
  };

  const handleRemoveQuoteClick = (e) => {
    const index = parseInt(e.currentTarget.value);
    console.log({ index });
    dispatch({ type: REMOVE_QUOTE, index });
  };

  const handleAddQuoteClick = () => dispatch({ type: NEW_QUOTE });

  return (
    <div style={{ padding: "2em 0" }}>
      <Link to="/" style={{ marginBottom: "1.5em", display: "block" }}>
        Back to Quote
      </Link>
      <Fieldset>
        <FieldsetLegend>Font Settings</FieldsetLegend>
        <div>
          <label htmlFor="font-color-input">Font Color</label>
          <ColorControl>
            <ColorControlInput
              id="font-color-input"
              color={colorService.fontColor()}
              onInput={handleFontColorChange}
            />
          </ColorControl>
        </div>
      </Fieldset>
      <Fieldset>
        <FieldsetLegend>Background Colors</FieldsetLegend>
        <FieldsetButtonGroup>
          <button onClick={addColor}>Add Color</button>
          <button aria-label="clear all colors" onClick={removeAllColors}>
            <span aria-hidden>Clear All</span>
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
      <div>
        <h2 style={{ fontSize: "1.8em" }}>Quotes</h2>
        <div>
          {quotes.map((quote, index) => {
            return (
              <QuoteGroup.Container key={index} label={`quote ${index + 1}`}>
                <QuoteGroup.Heading>Quote #{index + 1}</QuoteGroup.Heading>
                <QuoteGroup.RemoveButton
                  index={index}
                  onClick={handleRemoveQuoteClick}
                />
                <QuoteGroup.Input
                  type="text"
                  name="author"
                  value={quote.author}
                  onChange={handleQuoteInputChange}
                  index={index}
                  label="Author"
                />
                <QuoteGroup.Input
                  type="url"
                  name="cite"
                  value={quote.cite}
                  onChange={handleQuoteInputChange}
                  index={index}
                  label="Citation URL"
                />
                <QuoteGroup.Textarea
                  name="quote"
                  value={quote.quote}
                  onChange={handleQuoteInputChange}
                  index={index}
                  label="Quote Text"
                />
              </QuoteGroup.Container>
            );
          })}
          <button
            onClick={handleAddQuoteClick}
            className={styles.ControlPanel__AddQuoteButton}
          >
            Add Quote
          </button>
        </div>
      </div>
    </div>
  );
}
