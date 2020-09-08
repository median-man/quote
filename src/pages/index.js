import React from "react";
import { navigate } from "gatsby";
import Blockquote from "../components/Blockquote";
import { useQuotes } from "../quotes";
import useKeyUp from "../hooks/useKeyUp";

export default function Home() {
  const { currentQuote } = useQuotes();
  useKeyUp(() => navigate("/control-panel"), "/");
  return <Blockquote {...currentQuote} />;
}
