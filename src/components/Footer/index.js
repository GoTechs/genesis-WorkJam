import React from "react";
import "./styles.sass";
import { Nav } from "react-bootstrap";
import { Trans, withNamespaces } from "react-i18next";

const footer = props => {
  return (
    <div className="footer">
      <Nav className="nav-footer" defaultActiveKey="/help" as="ul">
        <div className="footer-title">&copy; 2019 - Connect&amp;GO inc . |</div>
        <Nav.Item as="li" id="grey">
          <Nav.Link href="/help/security">
            <Trans i18nKey="FOOTER_SECURITY_LINK"> Security </Trans>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" id="grey">
          <Nav.Link href="/help/privacy">
            <Trans i18nKey="FOOTER_PRIVACY_LINK">Privacy </Trans>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" id="grey">
          <Nav.Link href="/help/terms-conditions">
            <Trans i18nKey="FOOTER_TERMS_CONDITIONS_LINK">
              Terms and Conditions
            </Trans>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/help/faq" id="grey">
            <Trans i18nKey="FOOTER_FAQ_LINK">FAQ </Trans>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
export default withNamespaces("translation")(footer);
