import React from 'react';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';

import iconBack from '../images/seta_.png';
import iconMinus from '../images/_.png';
import iconPlus from '../images/+.png';
import iconInfo from '../images/social/Sobre.png';

const iconAccept = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpwZ27bEMuQAWmUz8t4886H6pgcFY2IZikQ&usqp=CAU";
const iconSearch = "https://static-00.iconduck.com/assets.00/search-icon-2044x2048-psdrpqwp.png";
const iconExport = "https://e7.pngegg.com/pngimages/382/1010/png-clipart-computer-icons-export-export-miscellaneous-cdr-thumbnail.png";
const iconImport = "https://banner2.cleanpng.com/20180430/aqe/kisspng-computer-icons-import-export-download-imports-5ae7ad6fd4dff5.9747302515251326558719.jpg";

export class DeckBuilderEditHeader extends React.Component {

  SendToDeckList() {
    this.props.setCurrDeck(undefined);
    this.props.setIsDeckEdit(false);
    this.props.setShowBottomMenu(true);
    this.props.ClearCardsFilters();
    this.props.setViewState(DeckBuilderViewStates.DecksList);
  }

  SendToSearchCard() {
    this.props.setIsDeckEdit(true);
    this.props.setShowBottomMenu(false);
    this.props.setViewState(DeckBuilderViewStates.CardsList);
  }

  ShowDeckInformations () {
    var content = '<ul>' +
      `<li><strong>Total de Cartas:</strong><span style='margin-left: 1em;'>${this.props.currDeck.cards?.length??0}</span></li>` +
      "<li><hr></li><br>";
    const counters = this.props.SetCounts(this.props.currDeck.cards??[]);

    content += "<li>Galáxias</li>";
    if (counters.countGaia > 0) {
      content += `<li><strong>Gaia:</strong><span style='margin-left: 1em;'>${counters.countGaia}</span></li>`;
    }
    if (counters.countStroj > 0) {
      content += `<li><strong>Stroj:</strong><span style='margin-left: 1em;'>${counters.countStroj}</span></li>`;
    }
    if (counters.countMajik > 0) {
      content += `<li><strong>Majik:</strong><span style='margin-left: 1em;'>${counters.countMajik}</span></li>`;
    }
    if (counters.countAdroit > 0) {
      content += `<li><strong>Adroit:</strong><span style='margin-left: 1em;'>${counters.countAdroit}</span></li>`;
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>Tipos</li>";
    if (counters.cardTypes.length > 0) {
      counters.cardTypes.forEach(cardType => {
        if (cardType.amount > 0) {
          content += `<li><strong>${cardType.typeName}:</strong><span style='margin-left: 1em;'>${cardType.amount}</span></li>`;
        }
      });
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>Custos de Nível</li>";
    if (counters.levelCosts.length > 0) {
      counters.levelCosts.forEach(levelCost => {
        if (levelCost.amount > 0) {
          content += `<li><strong>N${levelCost.cost}:</strong><span style='margin-left: 1em;'>${levelCost.amount}</span></li>`;
        }
      });
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>Custos de Efeitos</li>";
    if (counters.effectsCosts.length > 0) {
      counters.effectsCosts.forEach(effectCost => {
        content += `<li><strong>E${effectCost.cost}:</strong><span style='margin-left: 1em;'>${effectCost.amount}</span></li>`;
      });
    }

    content += "</ul>";
    this.props.setModalContent(content);
    this.props.setIsShowModal(true);
  }

  render() {
    return (
      <>
        <div className='bt-deckBuilder bt-back' onClick={() => { this.SendToDeckList() }}>
          <img alt="Voltar" src={iconBack}></img>
        </div>
        <div className='deckBuilder-header-block'>
          <div className='title'>
            {this.props.currDeck.name.toUpperCase()}
          </div>
          <div className='header-options'>
            <div className='bt-deckBuilder bt-option' onClick={() => { this.ShowDeckInformations(); }}>
              <img alt="Informações sobre o deck" src={iconInfo}></img>
            </div>
            <div className='bt-deckBuilder bt-option' onClick={() => { this.SendToSearchCard(); }}>
              <img alt="Filtro" src={iconSearch}></img>
            </div>
            {/* <div className='bt-deckBuilder bt-option' onClick={() => { this.SaveChanges(); }}>
              <img alt="Salvar Alterações" src={iconAccept}></img>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

export class DeckBuilderEdit extends React.Component {

  ChangeAmountOfCardInDeck (cardCode, amount) {
    let index = -1;
    this.props.currDeck.cards.forEach((card, i) => {
      if (card.code === cardCode) {
        index = i;
      }
    });
    
    if (index > -1) {
      this.props.ChangeAmountOfCardInDeck(index, amount);
      this.props.currDeck.mainCards = this.props.currDeck.cards.filter(card => !card.specialCard);
      this.props.currDeck.specialCards = this.props.currDeck.cards.filter(card => card.specialCard);
      this.props.UpdateDeckListInSession();
      this.forceUpdate();
    }
  }

  SetShowMainDeck (value) {
    this.props.setShowMainDeck(value);
    this.forceUpdate();
  }

  render () {
    return (
      <>
        <div className='nav-tab'>
          <button onClick={() => { this.SetShowMainDeck(true) }}
            style={this.props.showMainDeck === true ? { backgroundColor: 'var(--cor-thema)' } : { color: 'var(--cor-thema)' }}>
            <strong>Principal</strong>
          </button>
          <button onClick={() => { this.SetShowMainDeck(false) }}
            style={this.props.showMainDeck === false ? { backgroundColor: 'var(--cor-thema)' } : { color: 'var(--cor-thema)' }}>
            <strong>Especial</strong>
          </button>
        </div>
        {this.props.showMainDeck ?
          <div className='deckBuilder-edit-block'>
            {/* <h4 className='padding-top-3 padding-bottom-1'>DECK PRINCIPAL</h4> */}
            <h4>DECK PRINCIPAL</h4>
            {this.props.currDeck.mainCards.length > 0 ? 
              this.props.currDeck.mainCards.map((card, i) =>
                <div className='deckBuilder-item' key={card.key}>
                  <div>
                    <h4 className='text-title'>{card.name}</h4>
                    <img alt="Thumbnail" className='deckBuilder-item-thumb' src={card.thumb}></img>
                  </div>
                  <div className='deckBuilder-item-nameBox'>
                    <div className='bt-deckBuilder bt-deck-editName' 
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, -1) }}>
                      <img alt="Decrementar" className='icon-img' src={iconMinus}></img>
                    </div>
                    <div className='bt-deckBuilder bt-deck-editName'
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, 1) }}>
                      <img alt="Incrementar" className='icon-img' src={iconPlus}></img>
                    </div>
                    <div className='deckBuilder-span-cardAmount'>
                      <span>{card.amount??0}/{this.props.IsCardTypeOf("RECURSO", card.cardTypes) ? '1' : '2'}</span>
                    </div>
                  </div>
                </div>
              ) : 
              <h5 className='padding-bottom-1'>Adicione cartas ao seu novo deck...</h5>
            }
          </div>
          : <></>
        }
        {!this.props.showMainDeck ?
          <div className='deckBuilder-edit-block'>
            {/* <h4 className='padding-top-3 padding-bottom-1'>DECK ESPECIAL</h4> */}
            <h4>DECK ESPECIAL</h4>
            {this.props.currDeck.mainCards.length > 0 ?
              this.props.currDeck.specialCards.map((card, i) =>
                <div className='deckBuilder-item' key={card.key}>
                  <div>
                    <h4 className='text-title'>{card.name.split(" (")[0]}</h4>
                    <img alt="Thumbnail" className='deckBuilder-item-thumb' src={card.thumb}></img>
                  </div>
                  <div className='deckBuilder-item-nameBox'>
                    <div className='bt-deckBuilder bt-deck-editName' 
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, -1) }}>
                      <img alt="Decrementar" className='icon-img' src={iconMinus}></img>
                    </div>
                    <div className='bt-deckBuilder bt-deck-editName'
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, 1) }}>
                      <img alt="Incrementar" className='icon-img' src={iconPlus}></img>
                    </div>
                    <div className='deckBuilder-span-cardAmount'>
                      <span>{card.amount??0}/{this.props.IsCardTypeOf("RECURSO", card.cardTypes) ? '1' : '2'}</span>
                    </div>
                  </div>
                </div>
              ) :
              <h5 className='padding-bottom-1'>Adicione cartas ao seu novo deck...</h5>
            }
          </div>
          : <></>
        }
      </>
    );
  }
}