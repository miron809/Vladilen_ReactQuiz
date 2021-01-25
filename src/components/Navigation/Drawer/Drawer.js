import React, { Component } from "react";
import "./Drawer.scss";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  { to: "/", label: "List", exact: true },
  { to: "/auth", label: "Auth", exact: false },
  { to: "/quiz-creator", label: "Create Quiz", exact: false }
];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink to={link.to} exact={link.exact} onClick={this.clickHandler}>
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const classes = ["Drawer"];
    !this.props.isOpen && classes.push("close");

    return (
      <>
        <nav className={classes.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
      </>
    );
  }
}

export default Drawer;
