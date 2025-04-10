import React from 'react';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import ChangeThumbWidth from '../tools/ChangeThumbWidth';
import { Galaxies } from '../models/CardsInfos';

import ActiveAnimation from '../tools/ActiveAnimation';


import iconSearch from '../images/lupa.png';
import iconGrid from '../images/grid 2x2.png';
import iconGrid3 from '../images/grid 3x3.png';
import iconGridMini from '../images/grid mini.png';
import iconOrdenar from '../images/ordenar.png';
import iconFiltro from '../images/filtro.png';
import iconBack from '../images/voltar.png';
import iconMinus from '../images/_.png';
import iconPlus from '../images/+.png';
import iconInfo from '../images/info_deck.png';

import iconGaia from '../images/pedras/Pedra1-icon.png';
import iconMajik from '../images/pedras/Pedra2-icon.png';
import icon1 from '../images/pedras/Pedra4-icon.png';
import icon2 from '../images/pedras/Pedra3-icon.png';
import icon3 from '../images/pedras/Pedra5-icon.png';

import iconAdroit from '../images/pedras/Pedra6-icon.png';
import iconStroj from '../images/pedras/Pedra7-icon.png';


export class CardsListHeader extends React.Component {
  timeoutSearch = undefined;

  SearchCard() {
    const input = document.getElementById("search-card-input");
    if (input && input.value) {
      this.props.SearchCard(input.value);
    }
    else {
      this.props.SearchCard();
    }
    ActiveAnimation('deckBuilder-item', 'entrada', true);
    this.forceUpdate();
  }

  ResetInputSearch() {
    const input = document.getElementById("search-card-input");
    input.value = "";
    this.SearchCard();
  }

  OnChangeSearchInput() {
    const input = document.getElementById("search-card-input");
    if (input && input.value) {
      if (this.timeoutSearch !== undefined) {
        clearTimeout(this.timeoutSearch);
      }
      this.timeoutSearch = setTimeout(() => {
        this.SearchCard();
      }, 1000);
    }
  }

  ToggleGalaxyFilterSelected(galaxy) {
    this.props.ToggleGalaxyFilterSelected(galaxy);
    this.SearchCard();
  }

  ToggleCategoryFilterSelected(category) {
    this.props.ToggleCategoryFilterSelected(category);
    this.SearchCard();
  }

  SendToAdvancedFilter() {
    this.props.setViewState(DeckBuilderViewStates.AdvancedSearchCard);

    ActiveAnimation("bt-filtro", "destaque-bt");
    this.props.setShowBottomMenu(false);
  }

  SendBackToDeckEdit() {
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  ChangeCardThumbWidth(option) {
    ChangeThumbWidth(option);

    ActiveAnimation("bt-visual", "destaque-bt");
    this.props.setThumbWidth(option);
  }

  GetCardsCountByCategory(category) {
    if (category === 'normals') {
      return this.props.countNormals;
    }
    else if (category === 'specials') {
      return this.props.countSpecials;
    }
    else if (category === 'fortress') {
      return this.props.countFortress;
    }
    else {
      return this.props.countNormals + this.props.countSpecials + this.props.countFortress;
    }
  }

  GetCardsCount() {
    if (this.props.IsCategoryFilterSelected('normals') === true) {
      return this.GetCardsCountByCategory('normals');
    }
    else if (this.props.IsCategoryFilterSelected('specials') === true) {
      return this.GetCardsCountByCategory('specials');
    }
    else if (this.props.IsCategoryFilterSelected('fortress') === true) {
      return this.GetCardsCountByCategory('fortress');
    }
    else {
      return this.GetCardsCountByCategory();
    }
  }

  render() {
    return (
      <>
        {this.props.isDeckEdit
          ? <div className='bt-deckBuilder bt-back' onClick={() => { this.SendBackToDeckEdit() }}>
            <img alt="Voltar" src={iconBack}></img>
            {/* <b style={'line-height: 4vmin;text-align: start;'}>VER<br></br>DECK</b> */}
          </div>
          : <></>
        }
        <div className='deckBuilder-header-block'>
          <div className='title'>
            {this.props.isDeckEdit ? 'ALTERAR CARDS DO DECK' : 'BIBLIOTECA DE CARDS'}
            {this.props.isDeckEdit
              ? <div className='deckBuilder-cards-results'>
                <button className="action deckBuilder-cards-back-deck"
                  onClick={() => { this.props.setViewState(DeckBuilderViewStates.DeckEdit); }}>
                  VER DECK ({this.props.GetCurrDeckCountNormals()}/40)
                </button>
              </div>
              : <div className='deckBuilder-cards-results'>
                <span className='deckBuilder-cards-results-info'>{this.GetCardsCount()}</span>
                <span className='deckBuilder-cards-results-label'> cards encontrados</span>
              </div>
            }
          </div>
          <div className='header-options'>
            <div className='bt-deckBuilder bt-option bt-option-invert bt-filtro' onClick={() => { this.SendToAdvancedFilter(); }}>
              <img alt="Filtro" src={iconFiltro}></img>
            </div>
            <div className='bt-deckBuilder bt-option bt-option-invert bt-ordem' onClick={() => { ActiveAnimation("bt-ordem", "destaque-bt"); this.props.setIsShowModalOrderBy(true); }}>
              <img alt="Ordenação" src={iconOrdenar}></img>
            </div>
            {this.props.thumbWidth == 'medium'
              ? <>
                <div className='bt-deckBuilder bt-option bt-option-invert bt-visual' onClick={() => { this.ChangeCardThumbWidth('small'); }}>
                  <img alt="Visualização" src={iconGrid}></img>
                </div>
              </>
              : this.props.thumbWidth == 'mini' || this.props.isDeckEdit
                ? <>
                  <div className='bt-deckBuilder bt-option bt-option-invert bt-visual' onClick={() => { this.ChangeCardThumbWidth('medium'); }}>
                    <img alt="Visualização" src={this.props.isDeckEdit ? iconGrid3 : iconGridMini}></img>
                  </div>
                </>
                : <>
                  <div className='bt-deckBuilder bt-option bt-option-invert bt-visual' onClick={() => { this.ChangeCardThumbWidth('mini'); }}>
                    <img alt="Visualização" src={iconGrid3}></img>
                  </div>
                </>
            }
            {this.props.isDeckEdit
              ? <>
                <div className='bt-deckBuilder bt-option bt-option-invert bt-infoDeck' onClick={() => { this.props.ShowDeckInformations(); }}>
                  <img alt="Informações sobre o deck" src={iconInfo} className={(this.props.deckErrorMessages && this.props.deckErrorMessages.length ? ' text-danger' : '')}></img>
                </div>
              </>
              : <></>
            }
          </div>
        </div>
        <div className='bt-deckBuilder bt-deckBuilder-search' onClick={() => { this.SearchCard() }}>
          <input type="text" id="search-card-input" placeholder='Pesquisar...' onChange={() => { this.OnChangeSearchInput() }}></input>
          <img alt="Busca" src={iconSearch}></img>
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
        <div className='deckBuilder-cards-categories'>
          <div className={this.props.GetCategoryClass('normals')}
            onClick={() => { this.ToggleCategoryFilterSelected('normals') }}>
            <span className='count'>{this.GetCardsCountByCategory('normals')}</span>
            <span className='title'> Normais</span>
          </div>
          <div className={this.props.GetCategoryClass('specials')}
            onClick={() => { this.ToggleCategoryFilterSelected('specials') }}>
            <span className='count'>{this.GetCardsCountByCategory('specials')}</span>
            <span className='title'> Especiais</span>
          </div>
          <div className={this.props.GetCategoryClass('fortress')}
            onClick={() => { this.ToggleCategoryFilterSelected('fortress') }}>
            <span className='count'>{this.GetCardsCountByCategory('fortress')}</span>
            <span className='title'> Fortalezas</span>
          </div>
        </div>
      </>
    );
  }
}


export class CardsListBody extends React.Component {

  UpdateCurrDeck() {
    this.props.currDeck.cards = this.props.OrderDeckCards(this.props.currDeck.cards);
    this.props.currDeck.mainCards = this.props.currDeck.cards.filter(card => !card.specialCard);
    this.props.currDeck.specialCards = this.props.currDeck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));
    this.props.currDeck.fortressCards = this.props.currDeck.cards.filter(card => !!this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));

    this.props.UpdateDeckListInSession();
  }

  SendBackToDeckEdit() {
    this.UpdateCurrDeck();
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  AddCardToDeck(params) {
    const card = params.card;
    const _this = params._this;

    const fortressFilteredList = _this.props.currDeck.cards.filter(p => _this.props.IsCardTypeOf("FORTALEZA", p.cardTypes));
    const isFortress = _this.props.IsCardTypeOf("FORTALEZA", card.cardTypes);
    const hasFortress = fortressFilteredList.length;
    if (isFortress && hasFortress) {
      const fortressRemove = fortressFilteredList[0];
      const indexFortress = _this.props.currDeck.cards.indexOf(fortressRemove);
      _this.props.ChangeAmountOfCardInDeck(indexFortress, -1);
    }

    const index = _this.props.IndexOfCardInDeck(card);
    if (index === -1) {
      card.amount = 1;
      _this.props.currDeck.cards.push(card);

      const messages = _this.props.TestDeck(_this.props.currDeck);
      _this.props.setDeckErrorMessages(messages);
    }
    else {
      _this.props.ChangeAmountOfCardInDeck(index, 1);
    }

    _this.props.setIsShowAlertModal(false);
    if (_this.isReturnToDeckEdit === true) _this.SendBackToDeckEdit();
    else { _this.UpdateCurrDeck(); }

    _this.forceUpdate();
  }

  CloseAlertModal(params) {
    params._this.props.setIsShowAlertModal(false);
  }

  TryAddCardToDeck(card, isReturnToDeckEdit = true) {
    if (!card) return;

    if (this.props.isDeckEdit === true) {
      this.isReturnToDeckEdit = isReturnToDeckEdit;

      const isFortress = this.props.IsCardTypeOf("FORTALEZA", card.cardTypes);
      const hasFortress = this.props.currDeck.cards.filter(p => this.props.IsCardTypeOf("FORTALEZA", p.cardTypes)).length;
      if (isFortress && hasFortress) {
        this.props.setMessageAlertModal("Você já possui uma fortaleza, deseja substituir?");
        this.props.setAcceptButtonNameAlertModal("Sim");
        this.props.setOnActionAlertModal(() => { return this.AddCardToDeck });
        this.props.setActionParamsAlertModal({ card: card, _this: this });
        this.props.setOnCloseAlertModal(() => { return this.CloseAlertModal });
        this.props.setCloseParamsAlertModal({ _this: this });
        this.props.setIsCancelButtonVisibleAlertModal(true);
        this.props.setIsShowAlertModal(true);
      }
      else {
        this.AddCardToDeck({ card: card, _this: this });
      }
    }
  }

  RemoveCardFromDeck(card) {
    if (!card) return;

    const index = this.props.IndexOfCardInDeck(card);
    if (index > -1) this.props.ChangeAmountOfCardInDeck(index, -1);
    this.UpdateCurrDeck();
    this.forceUpdate();
  }

  IndexOfCardInList(card) {
    for (var i = 0; i < this.props.cardsList.length; i++) {
      if (card.code === this.props.cardsList[i].code) {
        return i;
      }
    }
    return -1;
  }

  ShowPreviousCard(card) {
    const index = this.IndexOfCardInList(card);
    if (index <= 0) return;
    const prevCard = this.props.cardsList[index - 1];
    this.props.setCarouselModalCard(prevCard);
    this.forceUpdate();
  }

  ShowNextCard(card) {
    const index = this.IndexOfCardInList(card);
    if (index >= (this.props.cardsList.length - 1)) return;
    const nextCard = this.props.cardsList[index + 1];
    this.props.setCarouselModalCard(nextCard);
    this.forceUpdate();
  }

  OnClickCard(card) {
    const _this = this;
    this.props.setCarouselBackAction({ action: (card) => { _this.ShowPreviousCard(card) } });
    this.props.setCarouselForwardAction({ action: (card) => { _this.ShowNextCard(card) } });
    this.props.setCarouselMinusAction({ action: (card) => { _this.RemoveCardFromDeck(card) } });
    this.props.setCarouselPlusAction({ action: (card) => { _this.TryAddCardToDeck(card, false) } });

    this.props.setCarouselModalCard(card);
    this.props.setIsShowCarouselModal(true);
    this.forceUpdate();
  }

  render() {
    return (
      <>
        {this.props.cardsList.map((card, i) =>
          <div className='deckBuilder-item entrada' key={card.key}>
            <div onClick={() => { this.OnClickCard(card); }}>
              <img alt={card.name} className={'deckBuilder-card-thumb ' + (this.props.isDeckEdit && this.props.thumbWidth == 'mini' ? 'small' : this.props.thumbWidth)} src={card.thumb}></img>
            </div>
            {this.props.isDeckEdit === true
              ? <div className='deckBuilder-item-nameBox'>
                <div className='bt-deckBuilder'
                  onClick={() => { this.RemoveCardFromDeck(card) }}>
                  <img alt="Decrementar" className='icon-minus-plus' src={iconMinus}></img>
                </div>
                <div className='deckBuilder-span-cardAmount'>
                  <span>{this.props.GetCardAmountInDeck(card)}/{this.props.GetMaximumCardAmount(card)}</span>
                </div>
                <div className='bt-deckBuilder '
                  onClick={() => { this.TryAddCardToDeck(card, false) }}>
                  <img alt="Incrementar" className='icon-minus-plus' src={iconPlus}></img>
                </div>
              </div>
              : <></>
            }
          </div>
        )
        }
        {/* {this.props.isDeckEdit === true && this.props.showBottomMenu === true
          ? <div className='deckBuilder-footer'>
            <div className='deckBuilder-footer-item' onClick={() => this.props.setViewState(DeckBuilderViewStates.DeckEdit)}>
              <div className='deckBuilder-footer-itemBox'>
                <button className="action padding-top-1 padding-bottom-1 margin-top-3 margin-bottom-3 padding-left-1 padding-right-1">
                  Ver deck ({this.props.GetCurrDeckCountNormals()}/40)
                </button>
              </div>
            </div>
          </div>
          : <></>
        } */}
      </>
    );
  }
}