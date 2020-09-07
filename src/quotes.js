import React, { createContext, useReducer } from "react";
import { useState } from "react";
import { useContext } from "react";

const quotes = [
  {
    author: "Linus Torvalds",
    cite: "https://en.wikiquote.org/wiki/Linus_Torvalds",
    quote:
      "Start small, and think about the details. Don't think about some big picture and fancy design.",
  },
  {
    author: "Leo Pelligrino",
    cite: "https://youtu.be/bDf4O0-XV7I?t=1049",
    quote:
      "If you only practice what people teach you, then you'll only know what they know.",
  },
];

const initialState = { quotes, currentIndex: 1 };

const ctx = createContext({
  quotes: [],
  currentQuote: {},
  dispatch: () => {},
});

export const NEW_QUOTE = "NEW_QUOTE";
export const PATCH_QUOTE = "PATCH_QUOTE";
export const REMOVE_QUOTE = "REMOVE_QUOTE";

const patchQuote = (state, action) => {
  const { index, update } = action;
  const quotes = state.quotes.slice(0);
  quotes[index] = { ...state.quotes[index], ...update };
  return { ...state, quotes };
};

const newQuote = (state) => {
  return {
    ...state,
    quotes: [...state.quotes, { author: "", cite: "", quote: "" }],
  };
};

const removeQuote = (state, action) => {
  const { index } = action;

  const quotes = state.quotes
    .slice(0, index)
    .concat(state.quotes.slice(index + 1));

  let currentIndex = state.currentIndex;
  if (currentIndex >= index) {
    currentIndex -= 1;
  }

  return { ...state, quotes, currentIndex };
};

const reducer = (state, action) => {
  switch (action.type) {
    case NEW_QUOTE:
      return newQuote(state);

    case PATCH_QUOTE:
      return patchQuote(state, action);

    case REMOVE_QUOTE:
      return removeQuote(state, action);

    default:
      return state;
  }
};

export const QuotesProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ctx.Provider
      {...props}
      value={{
        ...state,
        currentQuote: state.quotes[state.currentIndex],
        dispatch,
      }}
    />
  );
};

export const useQuotes = () => useContext(ctx);

export default quotes;
