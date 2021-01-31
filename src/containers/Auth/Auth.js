import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import "./Auth.scss";
import Input from "../../components/UI/Input/Input";
import { createControl, validateControl } from "../../form/formFramework";
import axios from "axios";

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: createControl(
        {
          type: "email",
          label: "Email",
          errorMessage: "Email is incorrect!"
        },
        {
          required: true,
          email: true
        }
      ),
      password: createControl(
        {
          type: "password",
          label: "Password",
          errorMessage: "Password is incorrect!"
        },
        {
          required: true,
          minLength: 6
        }
      )
    }
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOSFgOIKSrccIU8ecZrFtIUZ0L0_tvoe8",
        authData
      );
    } catch (e) {
      console.log(e);
    }
  };
  signupHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOSFgOIKSrccIU8ecZrFtIUZ0L0_tvoe8",
        authData
      );
    } catch (e) {
      console.log(e);
    }
  };
  submitHandler = (e) => {
    e.preventDefault();
  };

  onChangeHandler = (e, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(e) => this.onChangeHandler(e, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Auth</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Button
              disabled={!this.state.isFormValid}
              type="success"
              onClick={this.loginHandler}
            >
              LogIn
            </Button>
            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.signupHandler}
            >
              SignUp
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
