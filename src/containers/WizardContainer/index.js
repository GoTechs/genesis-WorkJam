import React, { Component } from "react";
import WithSteps from "../../Common/HOC/WithSteps";
import Button from "../../components/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Trans, withNamespaces } from "react-i18next";
import Templates from "../../Services/Templates";
import "./styles.sass";
class WizardContainer extends Component {
  state = {
    steps: this.props.steps,
    activeStep: 0,
    skipped: new Set(),
    labels: ["validation wristband ", "registration ", "validation email"]
  };

  componentDidMount() {
    this.setState({
      steps: this.props.steps
    });
    this.addClass();
  }

  handleNextStep = () => {
    const activeStep = this.state.activeStep;
    let newSkipped = this.state.skipped;
    if (this.isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    this.setState(st => {
      st.activeStep = st.activeStep + 1;
      st.skipped = newSkipped;
      return st;
    });
  };

  handleBack = () => {
    this.setState(st => {
      st.activeStep = st.activeStep - 1;
      return st;
    });
  };

  handleSkip = () => {
    const activeStep = this.state.activeStep;
    const steps = this.state.steps;
    if (this.isOptionalStep(steps[activeStep].skip)) {
      return alert("you cant skip this step");
    }
    this.setState(st => {
      const newSkipped = new Set(st.skipped.values());
      newSkipped.add(activeStep);
      st.skipped = newSkipped;
      st.activeStep = st.activeStep + 1;
      return st;
    });
  };

  getStepsContent = () => {
    console.log(this.state.steps);
    const Template = Templates()[this.state.steps[this.state.activeStep].name];
    return (
      <Template
        {...this.props}
        handleNextStep={this.handleNextStep}
        handleSkip={this.handleSkip}
        handleBack={this.handleBack}
      />
    );
  };

  setActiveStep = step => {
    this.setState({
      activeStep: step
    });
  };

  handleReset = () => {
    this.setActiveStep(0);
  };

  setSkipped = skipped => {
    this.setState({
      skipped: skipped
    });
  };

  isOptionalStep = step => {
    const skipStep = this.state.steps[this.state.activeStep].skip
      ? this.state.activeStep
      : null;
    return step === skipStep;
  };

  isStepSkipped = step => {
    return this.state.skipped.has(step);
  };
  addClass = () => {
    let appClass = document.querySelector(".App");
    if (this.props.location.pathname === "/auth") {
      appClass.classList.remove("login");
      appClass.classList.add("register");
      appClass.style.height = "auto";
    }
  };

  render() {
    return (
      <div className="wizard-container">
        <div>
          <Stepper
            activeStep={this.state.activeStep}
            alternativeLabel
            className="stepper"
          >
            {this.state.labels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {this.state.activeStep === this.state.steps.length ? (
            <div>
              All steps completed - you&apos;re finished
              <Button primary onClick={this.handleReset}>
                <Trans i18nKey="Reset">Reset</Trans>
              </Button>
            </div>
          ) : (
            <div>
              {this.getStepsContent(this.state.activeStep)}

              <div>
                <Button
                  className={"light button primary"}
                  onClick={this.handleBack}
                  disabled={this.state.activeStep === 0}
                >
                  <Trans i18nKey="Back">Back</Trans>
                </Button>
                {this.isOptionalStep(this.state.activeStep) && (
                  <Button primary onClick={this.handleSkip}>
                    <Trans i18nKey="SKIP">Skip</Trans>
                  </Button>
                )}
                <Button primary onClick={this.handleNextStep}>
                  {this.state.activeStep === this.state.steps.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withNamespaces("wizard")(WithSteps(WizardContainer));
