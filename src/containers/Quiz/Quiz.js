import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: "Question #1",
        rightAnswerId: 3,
        answers: [
          { text: "Answer #1", id: 1 },
          { text: "Answer #2", id: 2 },
          { text: "Answer #3", id: 3 },
          { text: "Answer #4", id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = (answerId) => {
    console.log(answerId);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>
          <ActiveQuiz
            question={this.state.quiz[0].question}
            answers={this.state.quiz[0].answers}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
