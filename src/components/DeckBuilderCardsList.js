import React from 'react';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { Card, Galaxies } from '../models/CardsInfos';

import iconSearch from '../images/lupa.png';
import iconGrid from '../images/grid.png';
import iconOrdenar from '../images/ordenar.png';
import iconFiltro from '../images/filtro.png';
import iconBack from '../images/seta_.png';

import iconGaia from '../images/pedras/Pedra1-icon.png';
import iconMajik from '../images/pedras/Pedra2-icon.png';
import icon1 from '../images/pedras/Pedra4-icon.png';
import icon2 from '../images/pedras/Pedra3-icon.png';
import icon3 from '../images/pedras/Pedra5-icon.png';
import iconAdroit from '../images/pedras/Pedra6-icon.png';
import iconStroj from '../images/pedras/Pedra7-icon.png';

export function DeckBuilderCardsListHeader(props) {
  function SearchCard() {
    const input = document.getElementById("search-card-input");
    if (input && input.value) {
      props.SearchCard(input.value);
    }
    else {
      props.SearchCard();
    }
  }

  function ResetInputSearch() {
    const input = document.getElementById("search-card-input");
    input.value = "";
    SearchCard();
  }

  function ToggleGalaxyFilterSelected(galaxy) {
    props.ToggleGalaxyFilterSelected(galaxy);
    SearchCard();
  }

  function ToggleCategoryFilterSelected(category) {
    props.ToggleCategoryFilterSelected(category);
    SearchCard();
  }

  function SendToAdvancedFilter() {
    props.setViewState(DeckBuilderViewStates.AdvancedSearchCard);
  }

  function SendBackToDeckEdit() {
    props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  return (
    <>
      {props.isDeckEdit
        ? <div className='bt-deckBuilder bt-back' onClick={() => { SendBackToDeckEdit() }}>
          <img alt="Voltar" src={iconBack}></img>
        </div>
        : <></>
      }
      <div className='deckBuilder-header-block'>
        <div className='title'>
          {props.isDeckEdit ? 'ADICIONAR CARD' : 'BIBLIOTECA DE CARDS'}
        </div>
        <div className='header-options'>
          <div className='bt-deckBuilder bt-option' onClick={() => { SendToAdvancedFilter(); }}>
            <img alt="Filtro" src={iconFiltro}></img>
          </div>
          {!props.isDeckEdit
            ? <>
              <div className='bt-deckBuilder bt-option' onClick={() => { props.setIsShowModalOrderBy(true) }}>
                <img alt="Ordenação" src={iconOrdenar}></img>
              </div>
              <div className='bt-deckBuilder bt-option'>
                <img alt="Visualização" src={iconGrid}></img>
              </div>
            </>
            : <></>
          }
        </div>
      </div>
      <div className='bt-deckBuilder bt-deckBuilder-search' onClick={() => { SearchCard() }}>
        <input type="text" id="search-card-input" placeholder='Pesquisar...'></input>
        <img alt="Busca" src={iconSearch}></img>
        {/* <div className={"burger-menu open"} onClick={() => ResetInputSearch()} >
          <div className="bar1" key="b1" />
          <div className="bar2" key="b2" />
          <div className="bar3" key="b3" />
        </div> */}
      </div>
      <div className='deckBuilder-galaxiesContainer'>
        <div className={props.GetGalaxyClass(Galaxies.Gaia)}
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Gaia) }}>
          <img alt="Gaia" src={iconGaia}></img>
        </div>
        <div className={props.GetGalaxyClass(Galaxies.Majik)}
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Majik) }}>
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
        <div className={props.GetGalaxyClass(Galaxies.Adroit)}
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Adroit) }}>
          <img alt="Adroit" src={iconAdroit}></img>
        </div>
        <div className={props.GetGalaxyClass(Galaxies.Stroj)}
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Stroj) }}>
          <img alt="Stroj" src={iconStroj}></img>
        </div>
      </div>
      <div className='deckBuilder-cards-categories'>
        <div className={props.GetCategoryClass('normals')}
          onClick={() => { ToggleCategoryFilterSelected('normals') }}>
          <span className='count'>{props.countNormals}</span>
          <span className='title'> Normais</span>
        </div>
        <div className={props.GetCategoryClass('specials')}
          onClick={() => { ToggleCategoryFilterSelected('specials') }}>
          <span className='count'>{props.countSpecials}</span>
          <span className='title'> Especiais</span>
        </div>
        <div className={props.GetCategoryClass('fortress')}
          onClick={() => { ToggleCategoryFilterSelected('fortress') }}>
          <span className='count'>{props.countFortress}</span>
          <span className='title'> Fortalezas</span>
        </div>
      </div>
    </>
  );
}

export function DeckBuilderCardsList(props) {

  function SendBackToDeckEdit() {
    props.currDeck.cards = props.currDeck.cards.sort(function (a, b) {
      let strList = [a.name, b.name].sort();
      if (strList[0] === a.name) { return -1; }
      else { return 1; }
    });
    props.currDeck.mainCards = props.currDeck.cards.filter(card => !card.specialCard);
    props.currDeck.specialCards = props.currDeck.cards.filter(card => card.specialCard && !props.IsCardTypeOf("FORTALEZA", card.cardTypes));
    props.currDeck.fortressCards = props.currDeck.cards.filter(card => !!props.IsCardTypeOf("FORTALEZA", card.cardTypes));

    props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  function IndexOfCardInDeck(card) {
    if (!props.currDeck.cards) props.currDeck.cards = [];

    for (var i = 0; i < props.currDeck.cards.length; i++) {
      if (card.code === props.currDeck.cards[i].code) {
        return i;
      }
    }
    return -1;
  }

  function AddCardToDeck(card) {
    if (!props.isDeckEdit) {
      return;
    }

    if (!card) {
      return;
    }

    var index = IndexOfCardInDeck(card);
    if (index === -1) {
      card.amount = 1;
      props.currDeck.cards.push(card);
    }
    else {
      props.ChangeAmountOfCardInDeck(index, 1);
    }

    props.UpdateDeckListInSession();
    SendBackToDeckEdit();
  }

  return (
    <>
      {props.cardsList.map((card, i) =>
        <div className='deckBuilder-item' key={card.key}>
          <div onClick={() => { AddCardToDeck(card); }}>
            {/* <h4 className='text-title'>{card.name}</h4> */}
            <img alt={card.name} className='deckBuilder-item-thumb' src={card.thumb}></img>
          </div>
        </div>
      )}
    </>
  );
}