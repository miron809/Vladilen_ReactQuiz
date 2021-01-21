import React from "react";
import "./FinishedQuiz.scss";

const FinishedQuiz = (props) => {
  console.log(props);
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={"FinishedQuiz"}>
      <ul>
        {props.quiz.map((quizItem, i) => {
          const cls = [
            "fa",
            props.results[quizItem.id] === "error"
              ? "fa-times error"
              : "fa-check success"
          ];

          return (
            <li key={i}>
              <strong>{i + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>

      <p>
        Right {successCount} from {props.quiz.length}
      </p>
      <div>
        <button onClick={props.onRetry}>Retry</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
