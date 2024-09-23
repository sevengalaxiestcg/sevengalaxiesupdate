import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Modal.css';
import './Toolbar.css';

export function AlertModal(props) {

  const history = useHistory();

  useEffect(() => {
    //CONTROLANDO O BOTÃO VOLTAR
    if (history.action === 'POP') {
      return () => {
        if (props.cancelVisible && typeof props.onClose === 'function')
          props.onClose(props.closeParams);
        else if(typeof props.onAction === 'function')
          props.onAction(props.actionParams);
      }
    }
  });

  function handleCancel() {
    window.history.back();
    if (typeof props.onClose === 'function')
      props.onClose(props.closeParams);
  }

  function handleAction() {
    window.history.back();
    if (typeof props.onAction === 'function')
      props.onAction(props.actionParams);
    if (props.cancelVisible && typeof props.onClose === 'function')
      props.onClose(props.closeParams);
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

export function FullScreenModal(props) {
  
  function CloseModal() {
    props.setIsShowModal(false);
  }
  
  return (
    <div className="modal-fullScreen"
      style={ props.isShowModal? { display: 'block' } : { display: 'none' } }
      onClick={() => { CloseModal() }}>

      <div className='toolbar'>
        <div className='content-toolbar'>
          <div class="burger-menu open"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div></div>
        </div>
      </div>
      
      <div className="modal-fullScreen-container">
        <div className="modal-fullScreen-body">
          <div className="modal-fullScreen-title">
            {props.title}
          </div>
          <div className="modal-fullScreen-message" dangerouslySetInnerHTML={{__html: props.body}}></div>
        </div>
        <div className="modal-fullScreen-footer">
          <div className="modal-fullScreen-footer-message" dangerouslySetInnerHTML={{__html: props.footer}}></div>
        </div>
      </div>
    </div>
  );
}