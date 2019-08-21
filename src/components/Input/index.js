import React from "react";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";

import PhoneInput from "react-phone-number-input";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import styles from "./styles.sass";
import "react-phone-number-input/style.css";
import PVisibility_on from "../../assets/images/Eyes.png";
import visibility_off from "../../assets/images/visibility_off.png";
import Icon from "../Icons";

const input = props => {
  let inputElement = null;
  let inputClasses = [styles.InputElement];
  let erroMessage = null;

  if (props.blur && !props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
    erroMessage = props.errorText;
  }
  let errorStyle = {
    color: "red"
  };

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={`${props.elementclass} ${inputClasses.join(" ")}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onMouseOut={props.checkValidation}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onMouseOut={props.checkValidation}
        />
      );
      break;
    case "select":
      inputElement = (
        <div className={"select-style"}>
          <select
            className={inputClasses.join(" ")}
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case "year":
      inputElement = (
        <div className={"select-style"}>
          <YearPicker
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={year => props.changeDate(year, "year")}
          />
        </div>
      );
      break;
    case "month":
      inputElement = (
        <div className={"select-style"}>
          <MonthPicker
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            year={props.year}
            value={props.value}
            onChange={month => props.changeDate(month, "month")}
          />
        </div>
      );
      break;
    case "day":
      inputElement = (
        <div className={"select-style"}>
          <DayPicker
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            month={props.month}
            value={props.value}
            onChange={day => props.changeDate(day, "day")}
          />
        </div>
      );
      break;
    case "phone":
      inputElement = (
        <PhoneInput
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={phone => props.changePhone(phone)}
        />
      );
      break;
    case "CountryDropdown":
      inputElement = (
        <div className="select-style">
          <CountryDropdown
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={country => props.changeAdress(country)}
          />
        </div>
      );
      break;
    case "RegionDropdown":
      inputElement = (
        <div className="select-style">
          <RegionDropdown
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            country={props.country}
            onChange={region => props.changeAdress(region)}
          />
        </div>
      );
      break;
    case "text":
      inputElement = <div {...props.elementConfig}>{props.value}</div>;
      break;
    default:
      inputElement = (
        <input
          className={`${props.elementclass} ${inputClasses.join(" ")}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.dateChange}
        />
      );
  }

  return (
    <div
      className={`Input ${
        props.elementConfig && props.elementConfig.inputClass !== undefined
          ? props.elementConfig.inputClass
          : ""
      }`}
    >
      <label className="Label">
        {props.elementConfig && props.elementConfig.label !== undefined
          ? props.elementConfig.label
          : ""}
      </label>

      {inputElement}
      {props.elementConfig.information && (
        <Icon
          name="information"
          className={`icon input ${props.elementclass}`}
          clicked={props.showInformationModal}
        />
      )}

      {props.elementConfig.password && props.hiddenPassword && (
        <img
          src={PVisibility_on}
          className="icon input"
          alt="PVisibility_on"
          onClick={props.showOrHidePassword}
        />
      )}
      {props.elementConfig.password && !props.hiddenPassword && (
        <img
          src={visibility_off}
          className="icon input"
          id="visibility_off"
          alt="visibility_off"
          onClick={props.showOrHidePassword}
        />
      )}
      <div style={errorStyle} className="error-message">
        {erroMessage}
      </div>
    </div>
  );
};

export default input;
