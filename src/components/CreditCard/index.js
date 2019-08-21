import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import Button from "../Button";
import { Trans, withNamespaces } from "react-i18next";
import LimitCashContainer from "../../containers/LimitCashConatiner";
import "./styles.sass";
import Fragement from "../../Common/HOC/Fragement";
import Icon from "../../components/Icons";

const creditCard = props => {
  return (
    <Fragement>
      <div className="top-wallet-container">
        <div className="card-list-container">
          <div className="title-card">
            {!props.HideButtons && (
              <Trans i18nKey="wallet:WALLET_MY_CARDS_TITLE">
                <h2 id="grey">My credit cards </h2>
              </Trans>
            )}
            {props.HideButtons && (
              <Trans i18nKey="wallet:WALLET_CHOOSE_CARD_TITLE">
                <h2 id="grey">Chosse Card </h2>
              </Trans>
            )}
          </div>
          {props.creditCards && props.creditCards.length > 0 ? (
            <ListGroup
              defaultActiveKey={
                props.defaultCreditCardInfo &&
                props.defaultCreditCardInfo["ID_Billing_Information"]
              }
            >
              {props.creditCards
                .filter(item => item.CardType !== "TBD")
                .map((card, index) => {
                  const { MaskedAcctNum, CardType } = card;
                  const idCard = card["ID_Billing_Information"];
                  return (
                    <ListGroup.Item
                      className="card"
                      key={index}
                      eventKey={props.HideButtons ? idCard : null}
                      onClick={() =>
                        props.HideButtons
                          ? props.CreditCardClicked(idCard)
                          : null
                      }
                    >
                      <div className="card-info">
                        <div className="card-type">
                          {CardType === "VISA" ||
                            (CardType === "V" && <Icon name="visa" />)}

                          {CardType === "MASTERCARD" ||
                            (CardType === "M" && <Icon name="master-card" />)}
                        </div>
                        <div className="credit-card-number">
                          <p id="grey">{MaskedAcctNum}</p>
                        </div>
                        {!props.HideButtons && (
                          <Icon
                            name="delete"
                            clicked={() => props.DeleteCardClicked(idCard)}
                          />
                        )}
                      </div>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          ) : (
            <div>
              <p id="id">
                <Trans i18nKey="wallet:WALLET_NO_CREDIT_CARD">
                  There is no credit cards
                </Trans>
              </p>
            </div>
          )}
          {!props.HideButtons && (
            <div className="Buttons">
              <Button primary onClick={props.handleAddCreditCard}>
                <Trans i18nKey="ADD_CARD_BTN">+Add Card </Trans>
              </Button>
            </div>
          )}
        </div>
        {!props.HideButtons && (
          <div className="add-cash">
            <div className="account-balance">
              <h2 id="grey">Account Balance</h2>
              <div className="balance-number">
                <h1 id="grey">
                  {" "}
                  {`$ ${props.wristbandBalance["current_balance"]}`}{" "}
                </h1>
              </div>
            </div>
            <Button
              primary
              onClick={props.addCashClicked}
              disabled={props.creditCards && props.creditCards.length === 0}
            >
              <Trans i18nKey="ADD_CASH_BTN"> +Add Cash </Trans>
            </Button>
          </div>
        )}
      </div>
      {!props.HideButtons && (
        <LimitCashContainer
          creditCardList={props.creditCards}
          UsersInfo={props.UsersInfo}
          showAddPinCodeModal={props.showAddPinCodeModal}
        />
      )}
    </Fragement>
  );
};

creditCard.propTypes = {};

export default withNamespaces("wallet")(creditCard);
