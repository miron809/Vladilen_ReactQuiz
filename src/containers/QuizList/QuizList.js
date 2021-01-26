import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./QuizList.scss";

export default class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, i) => {
      return (
        <li key={i}>
          <NavLink to={"/quiz/" + quiz}>{quiz}</NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>QuizList</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
