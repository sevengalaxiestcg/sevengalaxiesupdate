import React from 'react';
import { deepCopy } from './Utils';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { Deck, Galaxies } from '../models/CardsInfos';

import ActiveAnimation from '../tools/ActiveAnimation';

import iconSearch from '../images/lupa.png';
import iconOrdenar from '../images/ordenar.png';
import iconNovoDeck from '../images/novo deck.png';
import iconCriarDeck from '../images/criar deck.png';
import iconTrash from '../images/excluir.png';
import iconRules from '../images/info regras deck.png';
import iconImportarDeck from '../images/importar.png';
import iconCopy from '../images/duplicar.png';
import iconExportText from '../images/baixar.png';
import iconExport from '../images/exportar.png';
import iconOptions from '../images/options.png';
import iconAccept from '../images/renomear.png';

import iconGaia from '../images/pedras/Pedra1-icon.png';
import iconMajik from '../images/pedras/Pedra2-icon.png';
import icon1 from '../images/pedras/Pedra4-icon.png';
import icon2 from '../images/pedras/Pedra3-icon.png';
import icon3 from '../images/pedras/Pedra5-icon.png';
import iconAdroit from '../images/pedras/Pedra6-icon.png';
import iconStroj from '../images/pedras/Pedra7-icon.png';

import pedra_Gaia from '../images/decks/pedra-deck-gaia.png';
import pedra_Stroj from '../images/decks/pedra-deck-stroj.png';
import pedra_Adroit from '../images/decks/pedra-deck-adroit.png';
import pedra_Majik from '../images/decks/pedra-deck-majik.png';

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

    this.props.setShowMainDeck(false);
    this.props.setShowSpecialDeck(false);
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
        let deckList = this.props.DeckList;

        const base64 = data.target.result.split("base64,")[1];
        const jsonString = atob(base64);
        const deckToImport = JSON.parse(jsonString);

        let newDeck = new Deck();
        newDeck.creationDate = new Date();
        newDeck.name = deckToImport.name;

        deckToImport.cards.forEach(card => {
          const filteredCards = this.props.AvailableCards.filter(p => p.key.replaceAll(" ", "") === card.key.replaceAll(" ", "") &&
            p.code.replaceAll(" ", "").replaceAll("-", "") === card.code.replaceAll(" ", "").replaceAll("-", ""));
          if (!!filteredCards.length) {
            let copy = deepCopy(filteredCards[0]);
            copy.amount = card.amount;
            newDeck.cards.push(copy);
          }
        });

        newDeck.mainCards = newDeck.cards.filter(card => !card.specialCard);
        newDeck.specialCards = newDeck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));
        newDeck.fortressCards = newDeck.cards.filter(card => !!this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));

        deckList.push(newDeck);
        this.props.SetDeckListInSession(deckList);

        this.props.setShowMainDeck(false);
        this.props.setShowSpecialDeck(false);
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

    ActiveAnimation("bt-add", "destaque-bt");

    this.props.setButtonsModalButtons(buttons);
    this.props.setIsShowModalButtons(true);


  }

  OpenRulesModal() {
    ActiveAnimation("bt-regras", "destaque-bt");

    this.props.setIsShowRules(true);
  }

  render() {
    return (
      <>
        <div className='deckBuilder-header-block'>
          <div className='title'>
            MEUS DECKS
            <div className='deckBuilder-decks-results'><span className='deckBuilder-decks-results-info'>{this.props.DeckListToShow.length}</span><span className='deckBuilder-cards-results-label'> decks encontrados</span></div>
          </div>

          <div className='header-options'>
            <div className='bt-deckBuilder bt-option bt-option-invert bt-regras' onClick={() => { this.OpenRulesModal() }}>
              <img alt="Regras de construção de Decks" src={iconRules}></img>
            </div>
            <div className='bt-deckBuilder bt-option bt-option-invert bt-ordem' onClick={() => { ActiveAnimation("bt-ordem", "destaque-bt"); this.props.setIsShowModalOrderBy(true); }}>
              <img alt="Ordenar" src={iconOrdenar}></img>
            </div>
            <div className='bt-deckBuilder bt-option bt-option-invert bt-add' onClick={() => { this.OpenButtonsModal() }}>
              <img alt="Adicionar deck" src={iconNovoDeck}></img>
            </div>
          </div>
        </div>
        {/* {this.props.HasFilterApplied() === true
          ? <div className='deckBuilder-decks-results'><span className='deckBuilder-decks-results-info'>{`${this.props.DeckListToShow.length} decks encontrados`}</span></div>
          : <></>} */}

        <div className='bt-deckBuilder bt-deckBuilder-search' onClick={() => { this.SearchDeck() }}>
          <input type="text" id="search-deck-input" placeholder='Pesquisar...' onChange={() => { this.OnChangeSearchInput() }}></input>
          <img alt="Pesquisar Deck" src={iconSearch}></img>
        </div>
        <div className='deckBuilder-galaxiesContainer'>
          <div className={this.props.GetGalaxyClass(Galaxies.Gaia)}
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Gaia) }}>
            <img alt="Gaia" src={iconGaia}></img>
          </div>
          <div className={this.props.GetGalaxyClass(Galaxies.Majik)}
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
          <div className={this.props.GetGalaxyClass(Galaxies.Adroit)}
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Adroit) }}>
            <img alt="Adroit" src={iconAdroit}></img>
          </div>
          <div className={this.props.GetGalaxyClass(Galaxies.Stroj)}
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
    const $this = this;
    const deck = this.props.DeckList[index];
    if (!deck.creationDate) deck.creationDate = new Date();

    let deckCards = [];
    deck.cards = this.props.OrderDeckCards(deck.cards);
    deck.cards.forEach(card => {
      const filteredList = $this.props.AvailableCards.filter(p => p.key === card.key && p.code === card.code);
      if (!!filteredList.length) {
        let availableCard = deepCopy(filteredList[0]);
        availableCard.amount = card.amount;
        availableCard.isAlternateArtSelected = card.isAlternateArtSelected;
        deckCards.push(availableCard);
      }
    });
    deck.cards = deckCards;
    this.props.DeckList[index] = deck;
    const deckList = deepCopy(this.props.DeckList);
    this.props.SetDeckListInSession(deckList);

    deck.mainCards = deck.cards.filter(card => !card.specialCard);
    deck.specialCards = deck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));
    deck.fortressCards = deck.cards.filter(card => !!this.props.IsCardTypeOf('FORTALEZA', card.cardTypes));

    let cardsToShow = this.props.cardsToShow;
    cardsToShow.forEach(card =>{
      card.isAlternateArtSelected = !!deck.cards.filter(p => p.code === card.code && !!p.isAlternateArtSelected).length;
    });
    this.props.setCardsToShow(cardsToShow);

    const errorMessages = this.props.TestDeck(deck);

    this.props.setShowMainDeck(false);
    this.props.setShowSpecialDeck(false);
    this.props.setShowFortressDeck(false);
    this.props.setCurrDeck(deck);
    this.props.setDeckErrorMessages(errorMessages);
    this.props.setShowBottomMenu(false);
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  DeleteDeck(params) {
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
    this.props.setActionParamsAlertModal({ index: index, origin: $this });
    this.props.setOnCloseAlertModal(() => { return this.CloseAlertModal });
    this.props.setCloseParamsAlertModal({ origin: $this });
    this.props.setIsCancelButtonVisibleAlertModal(true);
    this.props.setIsShowAlertModal(true);
  }

  ExportDeck(index) {
    const origin = this.props.DeckList[index];
    const deck = {
      name: origin.name,
      cards: []

    };
    for (var i = 0; i < origin.cards.length; i++) {
      const card = origin.cards[i];
      deck.cards.push({ key: card.key.replaceAll(" ", ""), code: card.code.replaceAll(" ", "").replaceAll("-", ""), amount: card.amount });
    }


    // file extension ".sgd" ("sgd" stands for "Seven Galaxies Deck")
    const filename = `${origin.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "")}.json`;
    const file = new File([JSON.stringify(deck)], filename, { type: 'text/json' });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);
    link.download = filename;

    link.click();
    URL.revokeObjectURL(link.href);
  }

  ExportDeckText(index) {
    const deck = this.props.DeckList[index];


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

    const filename = `${deck.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "")}.txt`;
    const file = new File([deckText], filename, { type: 'text/plain' });

    const link = document.createElement("a");


    link.href = URL.createObjectURL(file);
    link.download = filename;

    link.click();
    URL.revokeObjectURL(link.href);
  }

  TryExportDeck(index, exportType) {
    const messages = this.props.TestDeck(this.props.DeckList[index]);

    let message = "";
    if (messages.length) message = messages[0];

    if (message !== "") {
      const $this = this;
      this.props.setMessageAlertModal(message);
      this.props.setAcceptButtonNameAlertModal("Ok");
      this.props.setOnActionAlertModal(() => { return this.CloseAlertModal });
      this.props.setActionParamsAlertModal({ origin: $this });
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

    this.props.setCardsToShow(this.props.AvailableCards);
    this.props.setShowMainDeck(false);
    this.props.setShowSpecialDeck(false);
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
        alt: 'Exportar (.json)',
        icon: iconExport,
        onClick: () => { this.TryExportDeck(index) }
      },
      {
        alt: 'Baixar (.txt)',
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

  GetThumbDeck(index) {
    const deck = this.props.DeckList[index];
    let thumbs = [];
    let count = 0;


    if (deck.cards.filter(p => p.galaxy == Galaxies.Gaia).length) {
      thumbs.push(
        <div className="deckBuilder-deck-galaxy bg-deck-gaia">
          <img alt="Gaia" src={pedra_Gaia}></img>
        </div>);
      count++;
    }
    if (deck.cards.filter(p => p.galaxy == Galaxies.Stroj).length) {
      thumbs.push(
        <div className="deckBuilder-deck-galaxy bg-deck-stroj">
          <img alt="Stroj" src={pedra_Stroj}></img>
        </div>);
      count++;
    }
    if (deck.cards.filter(p => p.galaxy == Galaxies.Majik).length) {
      thumbs.push(
        <div className="deckBuilder-deck-galaxy bg-deck-majik">
          <img alt="Majik" src={pedra_Majik}></img>
        </div>);
      count++;
    }
    if (deck.cards.filter(p => p.galaxy == Galaxies.Adroit).length) {
      thumbs.push(
        <div className="deckBuilder-deck-galaxy bg-deck-adroit">
          <img alt="Adroit" src={pedra_Adroit}></img>
        </div>);
      count++;
    }
    if (count == 0) {
      thumbs.push(
        <div className="deckBuilder-deck-galaxy bg-deck-7g">
        </div>);
      count++;
    }

    return <div className={'deckBuilder-deck-thumb grid' + count}> {thumbs} </div>;
  }

  render() {
    return (
      <div className='deckBuilder-body-decks-container'>
        {
          this.props.DeckList.map((deck, i) =>
            <div className='deckBuilder-item' key={i}>
              <div className={this.props.isShowEditDeckName !== i ? "editable" : ""}
                onClick={() => { if (this.props.isShowEditDeckName !== i) this.SendToEditDeck(i) }}>

                {this.GetThumbDeck(i)}

              </div>
              {this.props.isShowEditDeckName === i
                ? <div className='deckBuilder-deck-nameBox editBox'>
                  <input maxLength={30} type="text" id={'inputEditDeckName_' + i}></input>
                  <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.AcceptEditDeckName(i) }}>
                    <img alt="Confirmar" className='icon-img icon-img-renomear' src={iconAccept}></img>
                  </div>
                </div>
                :
                <div className='deckBuilder-deck-nameBox'>
                  <b onClick={() => { this.ToogleSetIsShowEditDeckName(i) }}>{deck.name.length > 15 ? deck.name.substring(0, 15) + '...' : deck.name}</b>
                  <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.OpenButtonsModal(i) }}>
                    <img alt="Opções" className='icon-img icon-img-straight' src={iconOptions}></img>
                  </div>
                </div>
              }
            </div>
          )}
      </div>
    );
  }
}