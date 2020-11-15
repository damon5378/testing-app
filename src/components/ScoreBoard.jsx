import React, { useEffect, useState } from "react";

export const ScoreBoard = ({ isCorrect }) => {
  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);

  useEffect(() => {
    if (isCorrect === null) return;

    if (isCorrect) {
      setCorrectScore(correctScore + 1);
    } else {
      setWrongScore(wrongScore + 1);
    }
  }, [isCorrect]);

  return (
    <div className="scoreboard">
      <div className="wrong">
        <strong>{wrongScore}</strong>
        <span>wrong</span>
      </div>
      <div className="correct">
        <strong>{correctScore}</strong>
        <span>correct</span>
      </div>
    </div>
  );
};
