import React from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>2.</strong>&nbsp;
        {props.question}
      </span>
      <small>4 from 12</small>
    </p>
    <AnswersList onAnswerClick={props.onAnswerClick} answers={props.answers} />
  </div>
);

export default ActiveQuiz;