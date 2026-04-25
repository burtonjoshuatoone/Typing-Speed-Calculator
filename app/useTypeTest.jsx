import { useState, useEffect, useRef } from "react";

export function useTypingTest(prompt) {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input === prompt && !endTime) {
      const finish = Date.now();
      setEndTime(finish);

      const minutes = (finish - startTime) / 1000 / 60;
      const words = prompt.split(" ").length;
      setWpm(Math.round(words / minutes));
    }
  }, [input, prompt, startTime, endTime]);

  return {
    input,
    setInput,
    wpm,
    isFinished: input === prompt,
  };
}
