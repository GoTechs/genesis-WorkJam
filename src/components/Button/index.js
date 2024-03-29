/**
 *
 * Button
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import cn from "classnames";
import "./styles.sass";

/* eslint-disable react/require-default-props */
function Button(props) {
  const buttonProps = Object.assign({}, props);
  const propsToDelete = ["primary", "social"];

  propsToDelete.map(value => delete buttonProps[value]);

  const label =
    !isEmpty(props.label) && !props.children ? (
      <span>{props.label}</span>
    ) : (
      props.children
    );

  return (
    <button
      className={cn(
        "button",
        props.cancel && "cancel",
        props.primary && "primary",
        props.confirm && "confirm",
        props.social === "facebook" && "primary",
        props.social === "github" && "github",
        props.social === "google" && "google",
        props.social === "twitter" && "twitter"
      )}
      type={props.type || "button"}
      {...buttonProps}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  label: PropTypes.string,
  primary: PropTypes.bool,
  type: PropTypes.string
};

export default Button;
