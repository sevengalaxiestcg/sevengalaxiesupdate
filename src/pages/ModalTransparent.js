import React, { useState, useEffect } from "react";

import './ModalTransparent.css';

export function ModalOptionsTransparent(props) {

  function CloseModal() {
    props.setIsShowModal(false);
  }

  function onOptionSelected (option) {
    props.onOptionSelected(option);
  }

  return (
    <div className="modal-transparent"
      style={ props.isShowModal? { display: 'block' } : { display: 'none' } }
      onClick={() => { CloseModal() }}
    >
      <div className="modal-transparent-body">
        {/* <div className="modal-transparent-pre"></div> */}
        <div className="modal-transparent-header">
          <div className="modal-transparent-title">
            {props.modalTitle}
          </div>
        </div>
        <div className="modal-transparent-content">
          <div className="modal-transparent-list">
            {props.options.map((option, i) =>
              <div className="modal-transparent-listItem" key={i} onClick={() => onOptionSelected(option)}>
                {option.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalTransparent(props) {

  function CloseModal() {
    props.setIsShowModal(false);
  }

  return (
    <div className="modal-transparent"
      style={ props.isShowModal? { display: 'block' } : { display: 'none' } }
      onClick={() => { CloseModal() }}
    >
      <div className="modal-transparent-body">
        {/* <div className="modal-transparent-pre"></div> */}
        <div className="modal-transparent-header">
          <div className="modal-transparent-title">
            {props.modalTitle}
          </div>
        </div>
        <div className="modal-transparent-content">
          <div className="modal-transparent-list" dangerouslySetInnerHTML={{__html: props.content}}></div>
        </div>
      </div>
    </div>
  );
}