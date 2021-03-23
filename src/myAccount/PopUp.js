import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default props => {
  const {
    buttonLabel,
    buttonColor = "primary",
    className,
    title,
    body,
    submitLabel,
    cancelLabel,
    onCancel = false,
    onSubmit = false,
    centered = false,
    header = true,
    footer = true
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitHandle = () => {
    if (onSubmit) onSubmit();
    toggle();
  };

  const cancelHandle = () => {
    if (onCancel) onCancel();

    toggle();
  };

  return (
    <div>
      <Button color={buttonColor} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        centered={centered}
      >
        {header && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
        <ModalBody>{body}</ModalBody>
        {footer && (
          <ModalFooter>
            <Button color="primary" onClick={submitHandle}>
              {submitLabel}
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="secondary" onClick={cancelHandle}>
              {cancelLabel}
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};
