import React from "react";
import { navigate } from "gatsby";
import Blockquote from "../components/Blockquote";
import { NEXT_QUOTE, PREV_QUOTE, useQuotes } from "../quotes";
import useKeyUp from "../hooks/useKeyUp";

export default function Home() {
  const { currentQuote, dispatch } = useQuotes();
  console.log(currentQuote);
  useKeyUp(() => navigate("/control-panel"), "/");
  useKeyUp(() => dispatch({ type: NEXT_QUOTE }), "ArrowRight");
  useKeyUp(() => dispatch({ type: PREV_QUOTE }), "ArrowLeft");
  return <Blockquote {...currentQuote} />;
}
