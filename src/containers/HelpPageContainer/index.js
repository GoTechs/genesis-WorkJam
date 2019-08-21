import React from "react";
import { Trans, withNamespaces } from "react-i18next";
import Nav from "react-bootstrap/Nav";
import { Switch, Route } from "react-router-dom";
import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css";

const helpPageContainer = () => {
  const DummyContent = () => (
    <p style={{ padding: "18px" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  );

  return (
    <div className="help-page-container">
      <Accordion atomic={true} className="accordion">
        <AccordionItem title="Security">
          <DummyContent />
        </AccordionItem>

        <AccordionItem title="Privacy">
          <DummyContent />
        </AccordionItem>

        <AccordionItem title="Faq">
          <DummyContent />
        </AccordionItem>
        <AccordionItem title="TermsAndCondition">
          <DummyContent />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default withNamespaces("translation")(helpPageContainer);
