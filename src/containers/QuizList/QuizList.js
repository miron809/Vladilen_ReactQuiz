import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./QuizList.scss";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };
  async componentDidMount() {
    try {
      const response = await axios.get("/quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, i) => {
        quizes.push({ id: key, name: `Test №${i + 1}` });
      });
      this.setState({ quizes, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>QuizList</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
