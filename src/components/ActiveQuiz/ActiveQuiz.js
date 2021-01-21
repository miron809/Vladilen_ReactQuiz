import React from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.questionNumber}</strong>.&nbsp;
        {props.question}
      </span>
      <small>
        {props.questionNumber} from {props.quizLength}
      </small>
    </p>
    <AnswersList
      state={props.state}
      onAnswerClick={props.onAnswerClick}
      answers={props.answers}
    />
  </div>
);

export default ActiveQuiz;
