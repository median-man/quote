import React from "react";
import { navigate } from "gatsby";
import Blockquote from "../components/Blockquote";
import quotes from "../quotes";
import useKeyUp from "../hooks/useKeyUp";

export default function Home() {
  useKeyUp(() => navigate("/control-panel"), "/");
  return <Blockquote {...quotes[1]} />;
}
