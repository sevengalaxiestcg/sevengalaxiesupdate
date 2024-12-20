import React from 'react';
import { deepCopy } from './Utils';

import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { Deck, Galaxies } from '../models/CardsInfos';

import iconSearch from '../images/lupa.png';
import iconOrdenar from '../images/ordenar.png';
import iconNovoDeck from '../images/novo deck.png';
import iconCriarDeck from '../images/criar deck.png';
import iconTrash from '../images/excluir.png';
import iconRules from '../images/info regras deck.png';
import iconImportarDeck from '../images/importar.png';
import iconCopy from '../images/duplicar.png';
import iconExportText from '../images/compartilhar.png';
import iconExport from '../images/compartilhar.png';
import iconOptions from '../images/options.png';
import iconAccept from '../images/renomear.png';

import iconGaia from '../images/pedras/Gaia.png';
import iconStroj from '../images/pedras/Stroj.png';
import iconMajik from '../images/pedras/Majik.png';
import iconAdroit from '../images/pedras/Adroit.png';
import icon3 from '../images/pedras/pedra 6 icon.png';
import icon2 from '../images/pedras/pedra 5 icon.png';
import icon1 from '../images/pedras/pedra 7 icon.png';

export class DeckBuilderDecksListHeader extends React.Component {

  timeoutSearch = undefined;

  SendToCreateNewDeck() {
    let newDeck = new Deck();
    newDeck.name = "Novo Deck";
    newDeck.thumb = this.props.thumbPadrao;
    newDeck.mainCards = [];
    newDeck.specialCards = [];
    newDeck.fortressCards = [];
    newDeck.creationDate = new Date();
    this.props.setCurrDeck(newDeck);

    let deckList = this.props.DeckList;
    deckList.push(newDeck);
    this.props.SetDeckListInSession(deckList);

    this.props.setCardsToShow(this.props.AvailableCards);
    this.props.setShowMainDeck(true);
    this.props.setShowFortressDeck(false);
    this.props.setShowBottomMenu(false);
    this.props.setIsDeckEdit(true);
    this.props.setViewState(DeckBuilderViewStates.CardsList);
  }

  SearchDeck() {
    const input = document.getElementById("search-deck-input");
    if (input && input.value) {
      this.props.SearchDeck(input.value);
    }
    else {
      this.props.SearchDeck();
    }
  }

  OnChangeSearchInput() {
    const input = document.getElementById("search-deck-input");
    if (input && input.value) {
      if (this.timeoutSearch !== undefined) {
        clearTimeout(this.timeoutSearch);
      }
      this.timeoutSearch = setTimeout(() => {
        this.SearchDeck();
      }, 1000);
    }
  }

  ToggleGalaxyFilterSelected(galaxy) {
    this.props.ToggleGalaxyFilterSelected(galaxy);
    this.SearchDeck();
  }

  ImportDeck() {
    const input = document.createElement("input");
    input.style.display = 'none';
    input.type = 'file';

    const appRoot = document.getElementsByClassName("app")[0];
    appRoot.appendChild(input);

    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = (data) => {
        const base64 = data.target.result.split("base64,")[1];
        const jsonString = atob(base64);
        let newDeck = JSON.parse(jsonString);
        newDeck.mainCards = newDeck.cards.filter(card => !card.specialCard);
        newDeck.specialCards = newDeck.cards.filter(card => card.specialCard);

        let deckList = this.props.DeckList;
        deckList.push(newDeck);
        this.props.SetDeckListInSession(deckList);

        this.props.setShowMainDeck(true);
        this.props.setShowFortressDeck(false);
        this.props.setCurrDeck(newDeck);
        this.props.setViewState(DeckBuilderViewStates.DeckEdit);
      };
  
      reader.readAsDataURL(file);
    };
    input.click();
  }

  OpenButtonsModal() {
    let buttons = [
      {
        alt: 'Criar Deck',
        icon: iconCriarDeck,
        onClick: () => { this.SendToCreateNewDeck() }
      },
      {
        alt: 'Importar Deck (.json)',
        icon: iconImportarDeck,
        onClick: () => { this.ImportDeck() }
      },
    ];
    this.props.setButtonsModalButtons(buttons);
    this.props.setIsShowModalButtons(true);
  }

  OpenRulesModal() {
    this.props.setIsShowRules(true);
  }

  render () {
    return (
      <>
        <div className='deckBuilder-header-block'>
          <div className='title'>
            MEUS DECKS
          </div>
          <div className='header-options'>
            <div className='bt-deckBuilder bt-option bt-option-invert' onClick={() => { this.OpenRulesModal() }}>
              <img alt="Regras de construção de Decks" src={iconRules}></img>
            </div>
            <div className='bt-deckBuilder bt-option bt-option-invert' onClick={() => { this.props.setIsShowModalOrderBy(true) }}>
              <img alt="Ordenar" src={iconOrdenar}></img>
            </div>
            <div className='bt-deckBuilder bt-option bt-option-invert' onClick={() => { this.OpenButtonsModal() }}>
              <img alt="Adicionar deck" src={iconNovoDeck}></img>
            </div>
          </div>
        </div>
        {this.props.HasFilterApplied() === true
          ? <div className='deckBuilder-decks-results'><span className='deckBuilder-decks-results-info'>{`${this.props.DeckListToShow.length} decks encontrados`}</span></div>
          : <></>}
        <div className='bt-deckBuilder bt-deckBuilder-search' onClick={() => { this.SearchDeck() }}>
          <input type="text" id="search-deck-input" placeholder='Pesquisar...' onChange={() => { this.OnChangeSearchInput() }}></input>
          <img alt="Pesquisar Deck" src={iconSearch}></img>
        </div>
        <div className='deckBuilder-galaxiesContainer'>
          <div className={ this.props.GetGalaxyClass(Galaxies.Gaia) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Gaia) }}>
            <img alt="Gaia" src={iconGaia}></img>
          </div>
          <div className={ this.props.GetGalaxyClass(Galaxies.Majik) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Majik) }}>
            <img alt="Majik" src={iconMajik}></img>
          </div>
          <div className='deckBuilder-galaxiesContainer-item bt-galaxy'>
            <img alt="???1" src={icon2}></img>
          </div>
          <div className='deckBuilder-galaxiesContainer-item bt-galaxy'>
            <img alt="???2" src={icon1} className='img-triangle'></img>
          </div>
          <div className='deckBuilder-galaxiesContainer-item bt-galaxy'>
            <img alt="???3" src={icon3}></img>
          </div>
          <div className={ this.props.GetGalaxyClass(Galaxies.Adroit) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Adroit) }}>
            <img alt="Adroit" src={iconAdroit}></img>
          </div>
          <div className={ this.props.GetGalaxyClass(Galaxies.Stroj) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Stroj) }}>
            <img alt="Stroj" src={iconStroj}></img>
          </div>
        </div>
      </>
    );
  }
}

export class DeckBuilderDecksListBody extends React.Component {

  ToogleSetIsShowEditDeckName(index) {
    this.props.setIsShowEditDeckName(index);

    setTimeout(() => {
      this.forceUpdate();

      const input = document.getElementById("inputEditDeckName_" + index);
      if (input) {
        const deck = this.props.DeckList[index];
        input.value = deck.name;
        input.focus();
      }
    }, 100);
  }

  AcceptEditDeckName(index) {
    const input = document.getElementById("inputEditDeckName_" + index);
    if (!input || !input.value || input.value === "") return;

    const deck = this.props.DeckList[index];
    const name = input.value;
    deck.name = name;
    this.props.setIsShowEditDeckName(-1);
    this.props.SetDeckListInSession(this.props.DeckList);
    this.forceUpdate();
  }

  SendToEditDeck(index) {
    const deck = this.props.DeckList[index];
    if (!deck.creationDate) deck.creationDate = new Date();

    deck.cards = this.props.OrderDeckCards(deck.cards);
    deck.mainCards = deck.cards.filter(card => !card.specialCard);
    deck.specialCards = deck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));
    deck.fortressCards = deck.cards.filter(card => !!this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));

    const errorMessages = this.props.TestDeck(deck);
    
    this.props.setShowMainDeck(true);
    this.props.setShowFortressDeck(false);
    this.props.setCurrDeck(deck);
    this.props.setDeckErrorMessages(errorMessages);    
    this.props.setShowBottomMenu(false);
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  DeleteDeck (params) {
    if (!params || params.index === undefined) return;
    if (!params.origin) params.origin = this;

    params.origin.props.DeckList.splice(params.index, 1);
    let deckList = params.origin.props.DeckList;
    params.origin.props.SetDeckListInSession(deckList);

    params.origin.props.setIsShowAlertModal(false);
    params.origin.forceUpdate();
  }

  CloseAlertModal(params) {
    if (!params) return;
    if (!params.origin) params.origin = this;
    params.origin.props.setIsShowAlertModal(false);
  }

  ConfirmDeleteDeck(index) {
    const $this = this;
    this.props.setMessageAlertModal("Tem certeza que deseja excluir o deck?");
    this.props.setAcceptButtonNameAlertModal("Sim");
    this.props.setOnActionAlertModal(() => { return this.DeleteDeck });
    this.props.setActionParamsAlertModal({ index: index, origin: $this});
    this.props.setOnCloseAlertModal(() => { return this.CloseAlertModal });
    this.props.setCloseParamsAlertModal({ origin: $this});
    this.props.setIsCancelButtonVisibleAlertModal(true);
    this.props.setIsShowAlertModal(true);
  }

  ExportDeck (index) {
    const deck = this.props.DeckList[index];
    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(deck)], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    // file extension ".sgd" ("sgd" stands for "Seven Galaxies Deck")
    link.download = `${deck.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "")}.sgd`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  ExportDeckText (index) {
    const deck = this.props.DeckList[index];
    const link = document.createElement("a");

    const fortress = deck.cards.filter(p => !!this.props.IsCardTypeOf("FORTALEZA", p.cardTypes));
    var deckText = deck.name +
                   "\n\nFORTALEZA\n" +
                   (fortress ? "1 " : "0 ") + (fortress ? fortress[0].name : "Nenhuma") + " [cod" + (fortress ? fortress[0].key : "N/A") + "]";

    deckText += "\n\nDECK\n";
    const deckCards = deck.cards.filter(p => !p.specialCard && !this.props.IsCardTypeOf("FORTALEZA", p.cardTypes));
    deckCards.forEach(card => {
      deckText += card.amount + " " + card.name + " [cod" + card.key + "]\n"
    });

    const specialCards = deck.cards.filter(p => !!p.specialCard &&
                                                !this.props.IsCardTypeOf("FORTALEZA", p.cardTypes) &&
                                                !this.props.IsCardTypeOf("RECURSO", p.cardTypes));
    deckText += "\nDECK ESPECIAL\n";
    specialCards.forEach(card => {
      deckText += card.amount + " " + card.name + " [cod" + card.key + "]\n"
    });
    
    const resourceCards = deck.cards.filter(p => this.props.IsCardTypeOf("RECURSO", p.cardTypes));
    resourceCards.forEach(card => {
      deckText += card.amount + " " + card.name + " [cod" + card.key + "]\n"
    });

    const file = new Blob([deckText], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    // file extension ".sgd" ("sgd" stands for "Seven Galaxies Deck")
    link.download = `${deck.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "")}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  TryExportDeck (index, exportType) {
    const messages = this.props.TestDeck(this.props.DeckList[index]);
    let message = "";
    if (messages.length) message = messages[0];

    if (message !== "") {
      const $this = this;
      this.props.setMessageAlertModal(message);
      this.props.setAcceptButtonNameAlertModal("Ok");
      this.props.setOnActionAlertModal(() => { return this.CloseAlertModal });
      this.props.setActionParamsAlertModal({ origin: $this});
      this.props.setIsCancelButtonVisibleAlertModal(false);
      this.props.setIsShowAlertModal(true);
    }
    else if (exportType === 'text') {
      this.ExportDeckText(index);
    }
    else {
      this.ExportDeck(index);
    }
  }

  CopyDeck(index) {
    const originDeck = this.props.DeckList[index];

    let newDeck = deepCopy(originDeck);
    newDeck.name = "Cópia de " + originDeck.name;
    newDeck.mainCards = newDeck.cards.filter(card => !card.specialCard);
    newDeck.specialCards = newDeck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));
    newDeck.fortressCards = newDeck.cards.filter(card => !!this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));
    this.props.setCurrDeck(newDeck);

    let deckList = this.props.DeckList;
    deckList.push(newDeck);
    this.props.SetDeckListInSession(deckList);

    this.props.setShowMainDeck(true);
    this.props.setShowFortressDeck(false);
    this.props.setShowBottomMenu(false);
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  OpenButtonsModal(index) {
    let buttons = [
      {
        alt: 'Duplicar',
        icon: iconCopy,
        onClick: () => { this.CopyDeck(index) }
      },
      {
        alt: 'Compartilhar (.json)',
        icon: iconExport,
        onClick: () => { this.TryExportDeck(index) }
      },
      {
        alt: 'Compartilhar (.txt)',
        icon: iconExportText,
        onClick: () => { this.TryExportDeck(index, 'text') }
      },
      {
        alt: 'Excluir',
        icon: iconTrash,
        onClick: () => { this.ConfirmDeleteDeck(index) }
      },
    ];
    this.props.setButtonsModalButtons(buttons);
    this.props.setIsShowModalButtons(true);
  }

  render() {
    return (
      <>
        {this.props.DeckList.map((deck, i) => 
            <div className='deckBuilder-item' key={i}>
              <div className={this.props.isShowEditDeckName !== i ? "editable" : ""}
                onClick={() => { if(this.props.isShowEditDeckName !== i) this.SendToEditDeck(i) }}
              >
                <div className='deckBuilder-item-thumb'></div>
              </div>
              {this.props.isShowEditDeckName === i 
                ? <div className='deckBuilder-item-nameBox editBox'>
                    <input type="text" id={'inputEditDeckName_' + i}></input>
                    <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.AcceptEditDeckName(i) }}>
                      <img alt="Confirmar" className='icon-img' src={iconAccept}></img>
                    </div>
                  </div>
                : 
                  <div className='deckBuilder-item-nameBox'>
                    <h4 onClick={() => { this.ToogleSetIsShowEditDeckName(i) }}>{deck.name}</h4>
                    <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.OpenButtonsModal(i) }}>
                      <img alt="Opções" className='icon-img icon-img-straight' src={iconOptions}></img>
                    </div>
                  </div>
              }
            </div>
          )}
      </>
    );
  }
}