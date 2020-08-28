const Quotes = (() => {
  let cursorIndex = 0;
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

  const current = () => quotes[0];
  const next = () => {
    if (cursorIndex < quotes.length) {
      cursorIndex += 1;
      return current();
    }
  };
  const previous = () => {
    if (cursorIndex > 0) {
      cursorIndex -= 1;
      return current();
    }
  };
  return Object.freeze({ current, next, previous });
})();
