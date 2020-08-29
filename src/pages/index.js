import React from "react";
import Blockquote from "../components/Blockquote";
import Page from "../components/Page";
import quotes from "../quotes";

export default function Home() {
  return (
    <Page>
      <Blockquote {...quotes[1]} />
    </Page>
  );
}
