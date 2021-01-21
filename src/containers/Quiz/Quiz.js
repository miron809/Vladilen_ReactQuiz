import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {}, //{[id]: success / error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //{id: 'success' / 'error'}
    quiz: [
      {
        id: 1,
        question: "Question #1",
        rightAnswerId: 3,
        answers: [
          { text: "Answer #1", id: 1 },
          { text: "Answer #2", id: 2 },
          { text: "Answer #3", id: 3 },
          { text: "Answer #4", id: 4 }
        ]
      },
      {
        id: 2,
        question: "Question #2",
        rightAnswerId: 1,
        answers: [
          { text: "Answer #2.1", id: 1 },
          { text: "Answer #2.2", id: 2 },
          { text: "Answer #2.3", id: 3 },
          { text: "Answer #2.4", id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: {
          [answerId]: "success",
          results
        }
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          {this.state.isFinished ? (
            <FinishedQuiz
              onRetry={this.retryHandler}
              quiz={this.state.quiz}
              results={this.state.results}
            />
          ) : (
            <ActiveQuiz
              questionNumber={this.state.activeQuestion + 1}
              quizLength={this.state.quiz.length}
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
