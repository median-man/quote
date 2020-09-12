import React from "react";
import { navigate } from "gatsby";
import Blockquote from "../components/Blockquote";
import { NEXT_QUOTE, PREV_QUOTE, useQuotes } from "../quotes";
import useKeyUp from "../hooks/useKeyUp";
import { QuoteNavNext, QuoteNavPrev } from "../components/QuoteNav";
import { useRef } from "react";

export default function Home() {
  const { currentQuote, dispatch } = useQuotes();
  const touchRef = useRef({});
  const handleNextQuote = () => dispatch({ type: NEXT_QUOTE });
  const handlePrevQuote = () => dispatch({ type: PREV_QUOTE });
  useKeyUp(() => navigate("/control-panel"), "/");
  useKeyUp(() => handleNextQuote, "ArrowRight");
  useKeyUp(() => handlePrevQuote, "ArrowLeft");

  return (
    <div
      style={{ height: "100%" }}
      onTouchStart={(e) => {
        touchRef.current.startX = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const MIN_SWIPE_DISTANCE = 30;
        const changeX = e.changedTouches[0].clientX - touchRef.current.startX;
        if (changeX < -MIN_SWIPE_DISTANCE) {
          handlePrevQuote();
        } else if (changeX > MIN_SWIPE_DISTANCE) {
          handleNextQuote();
        }
      }}
    >
      <QuoteNavPrev
        ariaKeyShortcuts="ArrowLeft"
        onClick={handlePrevQuote}
      />
      <Blockquote {...currentQuote} />
      <QuoteNavNext
        ariaKeyShortcuts="ArrowRight"
        onClick={handleNextQuote}
      />
    </div>
  );
}
