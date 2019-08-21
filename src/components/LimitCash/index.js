/**
 *
 * add Cash component
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import { Trans, withNamespaces } from "react-i18next";
import Api from "../../Services/api";
import { get, map } from "lodash";
import { toast } from "react-toastify";
import Loader from "../../components/Loading/index";
import Input from "../../components/Input";
import FormServices from "../../Services/formServices";
import wrappedTranslation from "../../Common/HOC/WrappedLimitCashTranslation";
import Icon from "../Icons";
import "./styles.sass";

class LimitCash extends Component {
  state = {
    authFormType: {},
    formData: {},
    loading: false,
    isValidForm: false,
    showConfirmationAddCash: false,
    creditCardList: {}
  };
  componentWillMount() {
    this.setState(state => {
      state.authFormType = this.props.form;
      state.creditCardList = this.props.creditCardList;
      state.formData = {};
      return state;
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.lng !== this.props.lng) {
      this.setState(state => {
        state.authFormType = nextProps.form;
        state.creditCardList = this.props.creditCardList;
        state.formData = {};
        return state;
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const userId = this.props.userId;
    const cardId = this.props.cardId;
    let form = { ...this.state.authFormType };
    const formData = {};

    for (let formElement in form) {
      formData[formElement] = form[formElement].value;
    }
    formData["user_id"] = userId;
    const limit = formData["limit"];
    const length = limit.toString().length + 2;
    formData["limit"] = limit.padEnd(length, "0");
    formData["credit_card_id"] = cardId;
    if (this.state.isValidForm) {
      this.setState({ formData: formData });

      Api.apiCall(formData, "POSAPIV2/addOpenLoopLimit")
        .then(response => {
          const success = response["success"];
          if (success === true) {
            this.setState({ loading: false });
            toast.success(
              <Trans i18nKey="wristband:WRISTBAND_LIMIT_ADDED">
                your limit is added
              </Trans>
            );
          }
          if (response["success"] === "cardNotSelected") {
            toast.error(
              <Trans i18nKey="wristband:WRISTBAND_CHOOSE_DEFAULT_CARD">
                you need to choose a default card first
              </Trans>
            );
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          toast.error(
            <Trans i18nKey="FAILED_SERVER_API">
              Unexpected internal server error.
            </Trans>
          );
        });
    }
  };

  render() {
    let inputs = this.state.authFormType;
    let self = this;
    return (
      <div className="limit-input">
        {this.state.loading && <Loader />}
        <form onSubmit={this.handleSubmit} autoComplete="off">
          {map(inputs, (input, key) => {
            return (
              <Input
                key={key}
                elementType={get(input, "elementType")}
                elementConfig={get(input, "elementConfig")}
                placeholder={get(input, "placeholder")}
                errorText={get(input, "errorText")}
                value={get(input, "value")}
                invalid={get(input, "valid")}
                shouldValidate={get(input, "validation")}
                touched={get(input, "touched")}
                label={get(input, "label")}
                checked={get(input, "checked")}
                blur={get(input, "blur")}
                changed={event =>
                  FormServices.inputChangedHandler(event, key, self)
                }
                checkValidation={() =>
                  FormServices.checkvalidityOnBlur(key, self)
                }
              />
            );
          })}

          <Button
            id="limit"
            label="Submit"
            type="submit"
            disabled={!this.state.isValidForm}
          >
            <Icon name="limit-submit" />
          </Button>
        </form>
      </div>
    );
  }
}

LimitCash.propTypes = {};

export default wrappedTranslation(withNamespaces("wristband")(LimitCash));
