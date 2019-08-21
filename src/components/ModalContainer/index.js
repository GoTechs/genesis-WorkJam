import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { withNamespaces } from "react-i18next";
import "./styles.sass";

class ModalContainer extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.headerTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
      </Modal>
    );
  }
}
export default withNamespaces("translation")(ModalContainer);
