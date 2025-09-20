import { useEffect, useState } from "react";

const LINES = [
  "Your ideas have power—build boldly.",
  "Laugh loudly.",
  "Let your spark light up the week.",
];

export default function SlidingText() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let timer;

    if (charIndex < LINES[lineIndex].length) {
      timer = setTimeout(() => {
        setDisplayed((prev) => prev + LINES[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 60); // typing speed
    } else {
      // pause after full line, then reset to next
      timer = setTimeout(() => {
        setDisplayed("");
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % LINES.length);
      }, 1500); // pause before next line
    }

    return () => clearTimeout(timer);
  }, [charIndex, lineIndex]);

  return (
    <div className="flex-1 justify-center mt-50 h-50 md:flex md:relative top-30">
      <h1 className="text-2xl md:text-4xl font-bold">
        <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
          {displayed}
        </span>
        <span className="animate-pulse text-yellow-400">|</span>
      </h1>
    </div>
  );
}
