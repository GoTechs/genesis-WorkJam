import React from "react";
import { Trans, withNamespaces } from "react-i18next";
import { ListGroup } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Icon from "../Icons";
import "./styles.sass";

const historicTickets = props => {
  return (
    <div className="historic-ticket-container">
      <ListGroup>
        <div className="header-historic-ticket">
          <div className="link-list">
            <Nav.Link
              className="header-link"
              eventKey="2"
              as={Link}
              to="/home/my-tickets"
            >
              <Trans i18nKey="wallet:WALLET_MY_TICKETS_TITLE">My Tickets</Trans>
            </Nav.Link>
            <Icon name="arrow" />
          </div>
          <h2 className="transaction-title" id="grey">
            <Trans i18nKey="wallet:WALLET_TRANSACTIONS_HISTORY">
              Ticket History
            </Trans>
          </h2>
        </div>

        <ListGroup.Item className="historic">
          <div className="transaction-info">
            <div className="header-ticket">
              <h2 className="transaction-user" id="grey">
                Sliman kadour
              </h2>
            </div>
            <div className="info-ticket-container">
              <h5 className="transaction-number" id="grey">
                some content
              </h5>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default withNamespaces("wallet")(historicTickets);
