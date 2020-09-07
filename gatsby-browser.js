import React from "react";
import "typeface-roboto-condensed";
import "./src/styles/reset.css";
import "./src/styles/global.css";

import Page from "./src/components/Layout";
import { QuotesProvider } from "./src/quotes";

export const wrapPageElement = ({ element, props }) => {
  return <Page {...props}>{element}</Page>;
};

export const wrapRootElement = ({ element }) => (
  <QuotesProvider>{element}</QuotesProvider>
);
