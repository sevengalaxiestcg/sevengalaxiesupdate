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
        <div className="modal-transparent-content">
          {props.options.map((option, i) =>
            <span key={i}>
              {!!option.isTitle
                ? <div className="modal-transparent-title">
                    {option.value}
                  </div>
                : <div className="modal-transparent-list">
                    <span className="modal-transparent-listItem" onClick={() => onOptionSelected(option)}>
                      <input type="radio"/>
                      <span className="checkmark" style={ option.isSelected ? {padding: "0.1em", backgroundColor: "white"} : { } }></span>
                      <span className="inputLabel" style={ option.isSelected ? {fontWeight: 700} : { } }>{option.label}</span>
                    </span>
                  </div>
              }
            </span>
          )}
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
      <div className="modal-transparent-body floating">
        <div className="modal-transparent-content floating">
          <div className="modal-transparent-title">
            {props.modalTitle}
          </div>
          <div className="modal-transparent-list" dangerouslySetInnerHTML={{__html: props.content}}></div>
        </div>
      </div>
    </div>
  );
}