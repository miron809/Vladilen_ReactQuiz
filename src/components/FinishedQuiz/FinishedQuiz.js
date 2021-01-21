import React from "react";
import "./FinishedQuiz.scss";
import Button from "../../components/UI/Button/Button";

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
        <Button onClick={props.onRetry} type="primary">
          Retry
        </Button>
        <Button type="success">Go to tests list</Button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
