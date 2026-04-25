"use client";

import { useRef, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useTypingTest } from "./useTypeTest";

export default function App() {
  const [prompt, setPrompt] = useState(
    Math.random() > 0.5
      ? "The world has turned and left me here, just where I was before you appeared, and in your place an empty space has filled the void behind my brain."
      : faker.lorem.sentence(),
  );

  const textareaRef = useRef(null);
  const [invert, setInvert] = useState(false);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const { input, setInput, wpm, isFinished } = useTypingTest(prompt);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "sans-serif",

        background: invert ? "black" : "white",
        color: invert ? "white" : "black",

        padding: 20,
        borderRadius: 8,

        filter: invert ? "invert(1)" : "none",
      }}
    >
      <button
        onClick={() => setInvert((v) => !v)}
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          borderRadius: 6,
          fontSize: 14,
        }}
      >
        {invert ? "Normal Colors" : "Invert Colors"}
      </button>

      <h1>Typing Speed Test</h1>

      <p>
        <strong>Prompt:</strong>
      </p>
      <p style={{ padding: "10px", background: "#eee", borderRadius: 6 }}>
        {prompt}
      </p>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Start typing here..."
        rows={5}
        style={{
          width: "100%",
          padding: 10,
          fontSize: 16,
          borderRadius: 6,
          border: "1px solid #ccc",

          background: invert ? "black" : "white",
          color: invert ? "white" : "black",
        }}
        disabled={isFinished}
      />

      {isFinished && (
        <h2 style={{ marginTop: 20 }}>
          🎉 Finished! Your WPM: <strong>{wpm}</strong>
        </h2>
      )}

      <button
        onClick={() => {
          setPrompt(
            Math.random() > 0.5
              ? "The quick brown fox jumps over the lazy dog"
              : faker.lorem.sentence(),
          );
          window.location.reload();
        }}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          borderRadius: 6,
        }}
      >
        New Test
      </button>
    </div>
  );
}
