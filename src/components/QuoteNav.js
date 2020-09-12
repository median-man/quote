import React from "react";
import styles from "./QuoteNav.module.css";
import PropTypes from "prop-types";

function QuoteNav({
  onClick,
  ariaLabel,
  ariaKeyShortcuts,
  children,
  direction,
}) {
  const classNames = [styles.QuoteNav];
  if (direction === "left") {
    classNames.push(styles.QuoteNav_direction_left);
  } else {
    classNames.push(styles.QuoteNav_direction_right);
  }
  return (
    <button
      className={classNames.join(" ")}
      aria-label={ariaLabel}
      aria-keyshortcuts={ariaKeyShortcuts}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const propTypes = {
  ariaKeyShortcuts: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export function QuoteNavNext({ onClick, ariaKeyShortcuts }) {
  return (
    <QuoteNav
      onClick={onClick}
      ariaLabel="next quote"
      ariaKeyShortcuts={ariaKeyShortcuts}
      direction="right"
    >
      <span aria-hidden="true">&gt;</span>
    </QuoteNav>
  );
}

QuoteNavNext.propTypes = propTypes;

export function QuoteNavPrev({ onClick, ariaKeyShortcuts }) {
  return (
    <QuoteNav
      onClick={onClick}
      ariaLabel="previous quote"
      ariaKeyShortcuts={ariaKeyShortcuts}
      direction="left"
    >
      <span aria-hidden="true">&lt;</span>
    </QuoteNav>
  );
}

QuoteNavPrev.propTypes = propTypes;
