import React from "react";
import style from "./Blockquote.module.css";

export default function Blockquote({ cite, quote, author }) {
  return (
    <blockquote className={style.blockquote} cite={cite}>
      <p className={style.blockquote__body}>{quote}</p>
      <footer className={style.blockquote__byline}>&ndash; {author}</footer>
    </blockquote>
  );
}
