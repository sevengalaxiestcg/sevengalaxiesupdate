import React from "react";

import './ModalTransparent.css';

import iconBack from '../images/seta_esquerda.png'
import iconForward from '../images/seta_direita.png'
import iconMinus from '../images/_.png';
import iconPlus from '../images/+.png';

export function ModalOptionsTransparent(props) {

  function CloseModal() {
    props.setIsShowModal(false);
  }

  function onOptionSelected(option) {
    props.onOptionSelected(option);
  }

  return (
    <div className="modal-transparent"
      style={props.isShowModal ? { display: 'block' } : { display: 'none' }}
      onClick={() => { CloseModal() }}
    >
      <div className="modal-transparent-body">
        <div className="modal-transparent-content no-padding-top">
          {props && props.options
            ? props.options.map((option, i) =>
              <span key={i}>
                {!!option.isTitle
                  ? <div className="modal-transparent-title">
                    {option.value}
                  </div>
                  : <div className="modal-transparent-list">
                    <span className="modal-transparent-listItem" onClick={() => onOptionSelected(option)}>
                      <input type="radio" />
                      <span className="checkmark" style={option.isSelected ? { padding: "0.1em", backgroundColor: "white" } : {}}></span>
                      <span className="inputLabel" style={option.isSelected ? { fontWeight: 700 } : {}}>{option.label}</span>
                    </span>
                  </div>
                }
              </span>
            )
            : <></>
          }
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
      style={props.isShowModal ? { display: 'block' } : { display: 'none' }}
      onClick={() => { CloseModal() }}
    >
      <div className="modal-transparent-body floating">
        <div className="modal-transparent-content floating">
          <div className="modal-transparent-title">
            {props.modalTitle}
          </div>
          <div className="modal-transparent-list" dangerouslySetInnerHTML={{ __html: props.content }}></div>
        </div>
      </div>
    </div>
  );
}

export function ModalTransparentButtons(props) {

  function CloseModal() {
    props.setIsShowModal(false);
  }


  return (
    <div className="modal-transparent"
      style={props.isShowModal ? { display: 'block' } : { display: 'none' }}
      onClick={() => { CloseModal() }}
    >
      <div className="modal-transparent-body" >
        <div className="modal-transparent-content">
          {props && props.buttons
            ? props.buttons.map((button, i) =>
              <span key={i}>
                {!!button.isTitle
                  ? <div className="modal-transparent-title">
                    {button.label}
                  </div>
                  : <div className="modal-transparent-list">
                    <span className="modal-transparent-listItem" onClick={() => button.onClick()}>
                      <img alt={button.alt} src={button.icon}></img>
                      <span>{button.alt}</span>
                    </span>
                  </div>
                }
              </span>
            )
            : <></>
          }
        </div>
      </div>
    </div>
  );
}

export class ModalTransparentCarousel extends React.Component {

  CloseModal() {
    this.props.setIsShowModal(false);
  }

  BackAction() {
    this.props.backAction(this.props.card);
    this.forceUpdate();
  }

  ForwardAction() {
    this.props.forwardAction(this.props.card);
    this.forceUpdate();
  }

  MinusAction() {
    this.props.minusAction(this.props.card);
    this.forceUpdate();
  }

  PlusAction() {
    this.props.plusAction(this.props.card);
    this.forceUpdate();
  }

  render() {
    return (
      <div className="modal-transparent-carousel"
        style={this.props.isShowModal ? { display: 'block' } : { display: 'none' }}>

        <div className='toolbar' onClick={() => { this.CloseModal() }}>
          <div className='content-toolbar'>
            <div class="burger-menu open"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div></div>
          </div>
        </div>

        <div className="modal-transparent-carousel-container">
          <div className="modal-transparent-carousel-body">

            <div className="modal-transparent-carousel-body-content">
              <div className="icon-wrapper left" onClick={() => { this.BackAction() }}>
                <img className="icon" alt="Anterior" src={iconBack}></img>
              </div>
              <div className="icon-wrapper right" onClick={() => { this.ForwardAction() }}>
                <img className="icon" alt="Próxima" src={iconForward}></img>
              </div>
              <div className="card-container">
                <div className="modal-transparent-carousel-body-header">
                  <div className="modal-transparent-carousel-title" onClick={() => { this.CloseModal() }}>
                    {this.props.title}
                  </div>
                  <div className="modal-transparent-carousel-subtitle" onClick={() => { this.CloseModal() }}>
                    {this.props.subtitle}
                  </div>
                </div>
                <img className="thumb" alt={this.props.card.name} src={this.props.card.thumb}></img>
              </div>

            </div>
          </div>
          <div className="modal-transparent-carousel-footer">
            <div className="modal-transparent-carousel-footer-content">
              {this.props.isShowFooter === true
                ? <div className='deckBuilder-item-nameBox transparent'>
                  <div className='bt-deckBuilder'
                    onClick={() => { this.MinusAction() }}>
                    <img alt="Decrementar" className='icon-minus-plus' src={iconMinus}></img>
                  </div>
                  <div className='deckBuilder-span-cardAmount'>
                    <span>{this.props.GetCardAmountInDeck(this.props.card)}/{this.props.GetMaximumCardAmount(this.props.card)}</span>
                  </div>
                  <div className='bt-deckBuilder'
                    onClick={() => { this.PlusAction() }}>
                    <img alt="Incrementar" className='icon-minus-plus' src={iconPlus}></img>
                  </div>
                </div>
                : <></>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}