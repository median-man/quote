import React from "react";
import Blockquote from "../components/Blockquote";
import quotes from "../quotes";

export default function Home() {
  return <Blockquote {...quotes[1]} />;
}
