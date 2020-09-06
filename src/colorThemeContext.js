import React, { useState } from "react";
import defaultBgColors from "./defaultBgColors";
import { useContext } from "react";

const ctx = React.createContext();

export const ColorThemeProvider = (props) => {
  const [bgColors, setBgColors] = useState(defaultBgColors);
  return <ctx.Provider value={{ bgColors, setBgColors }} {...props} />;
};

export const useColorTheme = () => useContext(ctx);
