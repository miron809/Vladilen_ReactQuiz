import React from "react";
import "./MenuToggle.scss";

const MenuToggle = (props) => {
  const classes = ["MenuToggle", "fa"];
  props.isOpen ? classes.push("fa-times open") : classes.push("fa-bars");

  return <i className={classes.join(" ")} onClick={props.onToggle}></i>;
};

export default MenuToggle;
