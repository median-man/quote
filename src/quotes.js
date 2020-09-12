import React, { createContext, useReducer, useContext, useEffect } from "react";

const QUOTES_VERSION = "2";

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

const defaultState = { quotes, currentIndex: 1, version: QUOTES_VERSION };
const initialState = () => {
  // gatsby doesn't have a window when rendering production build
  if (!window || !window.localStorage) {
    return defaultState;
  }
  let storedState = localStorage.getItem("quotes-state");
  if (storedState) {
    storedState = JSON.parse(storedState);
    if (storedState.version === QUOTES_VERSION) {
      return storedState;
    }
  }
  return defaultState;
};
const storeState = (state) => {
  localStorage.setItem("quotes-state", JSON.stringify(state));
};

const ctx = createContext({
  version: "",
  quotes: [],
  currentIndex: 0,
  currentQuote: {},
  dispatch: () => {},
});

// ACTIONS
export const NEW_QUOTE = "NEW_QUOTE";
export const NEXT_QUOTE = "NEXT_QUOTE";
export const PATCH_QUOTE = "PATCH_QUOTE";
export const PREV_QUOTE = "PREV_QUOTE";
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

const nextQuote = (state) => {
  let nextIndex = state.currentIndex + 1;
  if (nextIndex >= state.quotes.length) {
    nextIndex = 0;
  }
  return {
    ...state,
    currentIndex: nextIndex,
  };
};

const prevQuote = (state) => {
  let nextIndex = state.currentIndex - 1;
  if (nextIndex < 0) {
    nextIndex = state.quotes.length - 1;
  }
  return {
    ...state,
    currentIndex: nextIndex,
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

    case NEXT_QUOTE:
      return nextQuote(state);

    case PREV_QUOTE:
      return prevQuote(state);

    case PATCH_QUOTE:
      return patchQuote(state, action);

    case REMOVE_QUOTE:
      return removeQuote(state, action);

    default:
      return state;
  }
};

export const QuotesProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  useEffect(() => {
    storeState(state);
  }, [state]);
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
