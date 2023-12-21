import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
const ModalPopup = (props) => {
  const body = props.body;
  const states = props.states;
  const tag = props.tag;
  const option = props.option;
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body.map((item, index) => {
          const CustomTag = tag[index];
          return (
            <div key={index} className="d-flex flex-column py-2">
              <p className="p-0 m-0">{item}</p>
              {CustomTag == "input" && (
                <CustomTag
                  onChange={(e) => {
                    states[index][1](e.target.value);
                  }}
                  value={states[index][0]}
                ></CustomTag>
              )}

              {CustomTag === "select" && (
                <select
                  onChange={(e) => {
                    states[index][1](e.target.value);
                  }}
                  value={states[index][0]}
                >
                  {option[index].map((item, index) => {
                    return <option key={index}>{item.name}</option>;
                  })}
                </select>
              )}
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            props.fuctionOnclick(e);
          }}
        >
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
