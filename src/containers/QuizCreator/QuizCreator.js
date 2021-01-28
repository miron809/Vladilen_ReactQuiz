import React, { Component } from "react";
import "./QuizCreator.scss";
import Button from "../../components/UI/Button/Button";
import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

function createAnswerControl(number) {
  return createControl(
    {
      label: `Answer ${number}`,
      errorMessage: "Field can't be empty",
      id: number
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Question",
        errorMessage: "Field can't be empty"
      },
      { required: true }
    ),
    answer1: createAnswerControl(1),
    answer2: createAnswerControl(2),
    answer3: createAnswerControl(3),
    answer4: createAnswerControl(4)
  };
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    rightAnserId: 1,
    isFormValid: false,
    formControls: createFormControls()
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  selectChangeHandler = (e) => {
    this.setState({
      rightAnserId: +e.target.value
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addQuiestionHandler = (e) => {
    e.preventDefault();

    const quiz = [...this.state.quiz];
    const index = quiz.length + 1;
    const {
      question,
      answer1,
      answer2,
      answer3,
      answer4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnserId: this.state.rightAnserId,
      answers: [
        { text: answer1.value, id: answer1.id },
        { text: answer2.value, id: answer2.id },
        { text: answer3.value, id: answer3.id },
        { text: answer4.value, id: answer4.id }
      ]
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      rightAnserId: 1,
      isFormValid: false,
      formControls: createFormControls()
    });
  };

  createQuizHandler = (e) => {
    e.preventDefault();
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + i}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(e) => this.onChangeHandler(e.target.value, controlName)}
          />
          {i === 0 && <hr />}
        </React.Fragment>
      );
    });
  }

  render() {
    const select = (
      <Select
        label="Right answer"
        value={this.state.rightAnserId}
        onChange={this.selectChangeHandler}
        options={[
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
          { text: "4", value: 4 }
        ]}
      />
    );

    return (
      <div className="QuizCreator">
        <div>
          <h1>QuizCreator</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}
            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.addQuiestionHandler}
            >
              Add question
            </Button>

            <Button
              disabled={this.state.quiz.length === 0}
              type="success"
              onClick={this.createQuizHandler}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
