import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Modal.css';


function Modal(props) {

  const history = useHistory();

  useEffect(() => {
    //CONTROLANDO O BOTÃO VOLTAR
    if (history.action === 'POP') {
      return () => {
        if (props.cancelVisible)
          props.onClose();
        else
          props.onAction();
      }
    }
  });

  function handleCancel() {

    window.history.back();
    // console.log('aqui no modal');
    props.onClose();
  }

  function handleAction() {
    window.history.back();
    props.onAction();
    if (props.cancelVisible) {
      // console.log('aqui no modal222');
      props.onClose();

    }
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="message">
          {props.message}
        </div>
        <div className="options">
          {props.cancelVisible
            ? <button className="cancel" onClick={() => handleCancel()}>
              {props.cancelName || "Cancelar"}
            </button>
            : null
          }
          <button className="action" onClick={() => handleAction()}>
            {props.actionName}
          </button>
        </div>
      </div>

    </div>

  )



}

export default Modal;