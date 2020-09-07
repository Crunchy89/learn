import React from "react";

const Modal = (props) => {
  const { id, size, title } = props;
  return (
    <React.Fragment>
      <div className="modal fade" id={id ? id : "modal-lg"}>
        <div
          className={`modal-dialog modal-dialog-centered modal-${
            size ? size : "lg"
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title ? title : "Modal"}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
