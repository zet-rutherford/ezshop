import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Toasts = (props) => {
  const variant = props.variant;
  return (
    <ToastContainer className="p-3" position={"top-end"}>
      <Toast
        onClose={() => props.states[1](false)}
        show={props.states[0]}
        delay={3000}
        className="d-inline-block m-1"
        bg={variant.toLowerCase()}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>{props.msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toasts;
