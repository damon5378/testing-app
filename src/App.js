import React, { useCallback, useEffect, useState } from "react";
import { CategorySelector } from "./components/CategorySelector";
import { ScoreBoard } from "./components/ScoreBoard";
import { Question } from "./components/Question";
import {ResultModal} from './components/ResultModal';

import "./App.css";

function App() {
  const [question, setQuestion] = useState(null)

  const [category, setCategory] = useState("any")

  const [isCorrect, setIsCorrect] = useState(null)

  /* const [correctScore, setCorrectScore] = useState(0) // transfer to ScoreBoard component. This states related to other way
  const [wrongScore, setWrongScore] = useState(0) */

  const getQuestion = useCallback(() => {
    setIsCorrect(null)
    let url = "https://opentdb.com/api.php?amount=13";

    if (category !== "any") url = url + `&category=${category}`

    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.results[0])
      });
  }, [category])


  useEffect(() => {
    getQuestion()
  }, [getQuestion, category])

  const handleQuestionAnswered = (answer) => {
    const isAnswerCorrect = answer === question.correct_answer
    setIsCorrect(isAnswerCorrect)
    
    /* if(isAnswerCorrect) {
      setCorrectScore(correctScore + 1) // This related to other way
    } else {
      setWrongScore(wrongScore + 1)
    } */
  }

  return (
    <div className="App">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && <ResultModal 
                                isCorrect={isCorrect} 
                                question={question} 
                                getQuestion={getQuestion}
                                answerQuestion={handleQuestionAnswered}/>}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector category={category} chooseCategory={setCategory} />
        <ScoreBoard  isCorrect={isCorrect}/> {/* correctScore={correctScore} wrongScore={wrongScore} other way*/}
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && <Question question={question}  answerQuestion={handleQuestionAnswered}/>}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}

export default App;
