/**
 * form services
 */

const formServices = {
  inputChangedHandler(value, inputIdentifier, self, notEventValue) {
    const updateAuthForm = {
      ...self.state.authFormType
    };
    const updateFormElement = { ...updateAuthForm[inputIdentifier] };

    if (notEventValue) {
      updateFormElement.value = value;
    } else {
      updateFormElement.value = value.target.value;
      updateFormElement.checked = value.target.checked;
    }
    updateFormElement.touched = true;

    updateAuthForm[inputIdentifier] = updateFormElement;
    updateFormElement.blur = false;

    self.setState(state => {
      state.authFormType = updateAuthForm;
      state.inputIdentifier = inputIdentifier;
      return state;
    });
  },

  checkvalidityOnBlur(inputIdentifier, self) {
    const updateAuthForm = {
      ...self.state.authFormType
    };
    const updateFormElement = { ...updateAuthForm[inputIdentifier] };
    updateFormElement.valid = this.checkvalidity(
      updateFormElement.value,
      updateFormElement.validation,
      updateFormElement.checked,
      self
    );
    let formIsValid = true;
    updateAuthForm[inputIdentifier] = updateFormElement;

    updateFormElement.blur = true;
    for (let identifier in updateAuthForm) {
      formIsValid = updateAuthForm[identifier].valid && formIsValid;
    }
    console.log("formIsValid", updateAuthForm);
    self.setState(state => {
      state.authFormType = updateAuthForm;
      state.isValidForm = formIsValid;
      return state;
    });
  },

  checkvalidity(value, rules, checked, self) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isChecked) {
      isValid = checked && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isConfirm) {
      if (self.state.authFormType.password.value)
        isValid = self.state.authFormType.password.value === value;
    }
    if (rules.isWristband) {
      if (
        self.state.authFormType.verification_code.value ||
        self.state.authFormType.serial_number.value
      )
        self.state.authFormType.barcode_number.show = false;
    }
    if (rules.isBarcode) {
      if (self.state.authFormType.barcode_number.value)
        self.state.authFormType.verification_code.valid = true;
      self.state.authFormType.serial_number.valid = true;
    }
    if (rules.isHexadecimal) {
      const pattern = /^[0-9a-fA-F]+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.phoneRequired) {
      isValid = value !== "" && isValid;
    }

    return isValid;
  }
};

export default formServices;
