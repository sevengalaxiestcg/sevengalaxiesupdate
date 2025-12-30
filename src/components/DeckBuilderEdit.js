import React from 'react';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import ActiveAnimation from '../tools/ActiveAnimation';
import ChangeThumbWidth from '../tools/ChangeThumbWidth';

import iconEdit from '../images/cards_edicao.png';
import iconBack from '../images/voltar.png';
import iconGrid from '../images/grid 2x2.png';
import iconGrid3 from '../images/grid 3x3.png';
import iconGridMini from '../images/grid mini.png';
import iconInfo from '../images/info_deck.png';
import iconOrdenar from '../images/ordenar.png';

export class DeckBuilderEditHeader extends React.Component {

  SendToDeckList() {
    this.props.setCurrDeck(undefined);
    this.props.setIsDeckEdit(false);
    this.props.setShowBottomMenu(true);
    this.props.ClearCardsFilters();
    this.props.setViewState(DeckBuilderViewStates.DecksList);
  }

  SendToSearchCard() {

    ActiveAnimation("bt-edit", "destaque-bt");

    let cardsToShow = this.props.cardsToShow;
    if (!cardsToShow || !cardsToShow.length) {
      cardsToShow = this.props.AvailableCards;
    }
    this.props.currDeck.cards.forEach(card => {
      cardsToShow.filter(p => p.code === card.code)
        .forEach(p => { p.isAlternateArtSelected = card.isAlternateArtSelected; });
      this.props.AvailableCards.filter(p => p.code === card.code)
        .forEach(p => { p.isAlternateArtSelected = card.isAlternateArtSelected; });
    });
    this.props.setCardsToShow(cardsToShow);
    this.props.setAvailableCards(this.props.AvailableCards);

    this.props.setIsDeckEdit(true);
    this.props.setShowBottomMenu(true);
    this.props.setViewState(DeckBuilderViewStates.CardsList);
  }

  IsCategoryFilterSelected(category) {
    return (category === 'main' && !!this.props.showMainDeck) ||
      (category === 'specials' && !!this.props.showSpecialDeck) ||
      (category === 'fortress' && !!this.props.showFortressDeck);
  }

  GetCategoryClass(category) {
    let cl = 'deckBuilder-cards-categories-item';
    cl = `${cl} ${this.IsCategoryFilterSelected(category) ? ' category-selected' : ''}`;
    if (category === 'normals') {
      cl += ' bt-filterNormals';
    }
    else if (category === 'specials') {
      cl += ' bt-filterSpecials';
    }
    else if (category === 'fortress') {
      cl += ' bt-filterFortress';
    }
    return cl;
  }

  SetShowMainDeck(value) {
    this.props.setShowMainDeck(value);
    if (value) {
      this.props.setShowSpecialDeck(false);
      this.props.setShowFortressDeck(false);
    }
    ActiveAnimation('deckBuilder-item', 'entrada', true);
    this.forceUpdate();
  }

  SetShowSpecialDeck(value) {
    this.props.setShowSpecialDeck(value);
    if (value) {
      this.props.setShowMainDeck(false);
      this.props.setShowFortressDeck(false);
    }

    ActiveAnimation('deckBuilder-item', 'entrada', true);
    this.forceUpdate();
  }

  SetShowFortressDeck(value) {
    this.props.setShowFortressDeck(value);
    if (value) {
      this.props.setShowMainDeck(false);
      this.props.setShowSpecialDeck(false);
    }
    ActiveAnimation('deckBuilder-item', 'entrada', true);
    this.forceUpdate();
  }

  GetCardsCount(category) {
    let count = 0;
    if (category === 'main') this.props.currDeck.mainCards.forEach(p => count += p.amount);
    if (category === 'specials') this.props.currDeck.specialCards.forEach(p => count += p.amount);
    if (category === 'fortress') this.props.currDeck.fortressCards.forEach(p => count += p.amount);
    return count;
  }

  ChangeCardThumbWidth(option) {
    ChangeThumbWidth(option);

    ActiveAnimation("bt-visual", "destaque-bt");
    this.props.setThumbWidth(option);
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
            <div className='deckBuilder-cards-results'><span className='deckBuilder-cards-results-info'>{this.GetCardsCount('main')}</span> <span className='deckBuilder-cards-results-label'> / 40</span></div>
          </div>
          <div className='header-options'>

            <div className='bt-deckBuilder bt-option bt-option-invert bt-edit' onClick={() => { this.SendToSearchCard(); }}>
              <img alt="Filtro" src={iconEdit}></img>
            </div>

            {this.props.thumbWidth == 'medium'
              ? <>
                <div className='bt-deckBuilder bt-option bt-option-invert bt-visual' onClick={() => { this.ChangeCardThumbWidth('small'); }}>
                  <img alt="Visualização" src={iconGrid}></img>
                </div>
              </>
              : this.props.thumbWidth == 'mini'
                ? <>
                  <div className='bt-deckBuilder bt-option bt-option-invert bt-visual' onClick={() => { this.ChangeCardThumbWidth('medium'); }}>
                    <img alt="Visualização" src={iconGridMini}></img>
                  </div>
                </>
                : <>
                  <div className='bt-deckBuilder bt-option bt-option-invert bt-visual' onClick={() => { this.ChangeCardThumbWidth('mini'); }}>
                    <img alt="Visualização" src={iconGrid3}></img>
                  </div>
                </>
            }
            <div className='bt-deckBuilder bt-option bt-option-invert bt-info' onClick={() => { ActiveAnimation("bt-info", "destaque-bt"); this.props.ShowDeckInformations(); }}>
              <img alt="Informações sobre o deck" src={iconInfo} className={(this.props.deckErrorMessages && this.props.deckErrorMessages.length ? ' text-danger' : '')}></img>
            </div>
          </div>
        </div>

        <div className='deckBuilder-cards-categories'>
          <div className={this.GetCategoryClass('main')}
            onClick={() => { this.SetShowMainDeck(!this.props.showMainDeck); }}>
            <span className='count'>{this.GetCardsCount('main')}</span>
            <span className='title'> Normais</span>
          </div>
          <div className={this.GetCategoryClass('specials')}
            onClick={() => { this.SetShowSpecialDeck(!this.props.showSpecialDeck); }}>
            <span className='count'>{this.GetCardsCount('specials')}</span>
            <span className='title'> Especiais</span>
          </div>
          <div className={this.GetCategoryClass('fortress')}
            onClick={() => { this.SetShowFortressDeck(!this.props.showFortressDeck); }}>
            <span className='count'>{this.GetCardsCount('fortress')}</span>
            <span className='title'> Fortaleza</span>
          </div>
        </div>

      </>
    );
  }
}

export class DeckBuilderEditBody extends React.Component {

  UpdateCurrDeck() {
    this.props.currDeck.mainCards = this.props.currDeck.cards.filter(card => !card.specialCard);
    this.props.currDeck.specialCards = this.props.currDeck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));
    this.props.currDeck.fortressCards = this.props.currDeck.cards.filter(card => !!this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));

    this.props.UpdateDeckListInSession();
  }

  ChangeAmountOfCardInDeck(cardCode, amount) {
    let index = -1;
    this.props.currDeck.cards.forEach((card, i) => {
      if (card.code === cardCode) {
        index = i;
      }
    });

    if (index > -1) {
      this.props.ChangeAmountOfCardInDeck(index, amount);
      this.UpdateCurrDeck();
      this.forceUpdate();
    }
  }

  ShowAllCards() {
    return (!this.props.showMainDeck && !this.props.showSpecialDeck && !this.props.showFortressDeck);
  }

  ShowPreviousCard(card) {
    const index = this.props.IndexOfCardInDeck(card);
    if (index <= 0) return;
    let prevCard = this.props.currDeck.cards[index - 1];
    if (prevCard.code === card.code) {
      prevCard = this.props.currDeck.cards[index - 2];
    }

    // thumb card
    let thumbCard = undefined;
    const hasAlternateArt = !!this.props.availableCards.filter(p => !!p.isAlternateArt && p.code === prevCard.code).length;
    if (hasAlternateArt) {
      if (!prevCard.isAlternateArt && !prevCard.isAlternateArtSelected ||
        !!prevCard.isAlternateArt && !!prevCard.isAlternateArtSelected
      ) {
        thumbCard = this.props.availableCards.filter(p => p.isAlternateArt !== prevCard.isAlternateArt && p.code === prevCard.code)[0];
      }
      else {
        thumbCard = prevCard;
        prevCard = this.props.availableCards.filter(p => p.isAlternateArt !== thumbCard.isAlternateArt && p.code === prevCard.code)[0];
      }
    }
    /////////////

    this.props.setCarouselThumbCard(thumbCard);
    this.props.setCarouselModalCard(prevCard);
    this.forceUpdate();
  }

  ShowNextCard(card) {
    const index = this.props.IndexOfCardInDeck(card);
    if (index >= (this.props.currDeck.cards.length - 1)) return;
    let nextCard = this.props.currDeck.cards[index + 1];
    if (nextCard.code === card.code) {
      nextCard = this.props.currDeck.cards[index + 2];
    }

    // thumb card
    let thumbCard = undefined;
    const hasAlternateArt = !!this.props.availableCards.filter(p => !!p.isAlternateArt && p.code === nextCard.code).length;
    if (hasAlternateArt) {
      if (!nextCard.isAlternateArt && !nextCard.isAlternateArtSelected ||
        !!nextCard.isAlternateArt && !!nextCard.isAlternateArtSelected
      ) {
        thumbCard = this.props.availableCards.filter(p => p.isAlternateArt !== nextCard.isAlternateArt && p.code === nextCard.code)[0];
      }
      else {
        thumbCard = nextCard;
        nextCard = this.props.availableCards.filter(p => p.isAlternateArt !== thumbCard.isAlternateArt && p.code === nextCard.code)[0];
      }
    }
    /////////////

    this.props.setCarouselThumbCard(thumbCard);
    this.props.setCarouselModalCard(nextCard);
    this.forceUpdate();
  }

  SetCardAlternateArtVisibility(card, isAlternateArtSelected) {
    const key = card.key.split("-B")[0];
    let thumbCard = undefined;

    this.props.availableCards.forEach((_card) => {
      if(_card.key.startsWith(key)) {
        _card.isAlternateArtSelected = isAlternateArtSelected;
        if(_card.key != card.key) {
          thumbCard = _card;
        }
      }
    });

    this.props.currDeck.cards.forEach((_card) => {
      if(_card.key.startsWith(key)) {
        _card.isAlternateArtSelected = isAlternateArtSelected;
      }
    });

    // invert cards
    this.props.setCarouselThumbCard(card);
    this.props.setCarouselModalCard(thumbCard);
    this.UpdateCurrDeck();
    this.forceUpdate();
  }

  OnClickCard(card) {
    const _this = this;
    this.props.setCarouselBackAction({ action: (card) => { _this.ShowPreviousCard(card) } });
    this.props.setCarouselForwardAction({ action: (card) => { _this.ShowNextCard(card) } });
    this.props.setCarouselMinusAction({ action: (card) => { _this.ChangeAmountOfCardInDeck(card.code, -1) } });
    this.props.setCarouselPlusAction({ action: (card) => { _this.ChangeAmountOfCardInDeck(card.code, 1) } });
    this.props.setCarouselThumbAction({ action: (card, isAlternateArtSelected) => { _this.SetCardAlternateArtVisibility(card, isAlternateArtSelected) } });

    let modalCard = undefined;
    let thumbCard = undefined;

    // thumb card
    const key = card.key.split("-B")[0];
    this.props.availableCards.forEach((_card) => {
      if(_card.key.startsWith(key)) {
        _card.isAlternateArtSelected = card.isAlternateArtSelected;

        if (!!card.isAlternateArtSelected && !!_card.isAlternateArt ||
          !card.isAlternateArtSelected && !_card.isAlternateArt
        ) {
          modalCard = _card;
        }
        else {
          thumbCard = _card;
        }
      }
    });
    /////////////
    
    this.props.setCarouselThumbCard(thumbCard);
    this.props.setCarouselModalCard(modalCard);
    this.props.setIsShowCarouselModal(true);
    this.forceUpdate();
  }

  GetThumbToShow(card) {
    const hasAlternateArt = !!this.props.availableCards.filter(p => p.code === card.code && !!p.isAlternateArt).length;
    const original = this.props.availableCards.filter(p => p.code === card.code && !p.isAlternateArt)[0];
    const alternate = this.props.availableCards.filter(p => p.code === card.code && !!p.isAlternateArt)[0];
    if (!!hasAlternateArt && !!card.isAlternateArtSelected) return alternate.thumb;
    return original.thumb;
  }

  render() {
    return (
      <div className={'deckBuilder-body-cards-container ' + this.props.thumbWidth}>
        {this.props.showMainDeck || this.ShowAllCards()
          ? this.props.currDeck.mainCards.length > 0 ?
            this.props.currDeck.mainCards.map((card, i) =>

              Array.from({ length: card.amount }).map((_, idx) => (
                <div className='deckBuilder-item entrada' key={`${card.key}-${idx}`}>
                  <div onClick={() => { this.OnClickCard(card); }}>
                    {/* <h4 className='text-title'>{card.name}</h4> */}
                    <img alt="Thumbnail" className={'deckBuilder-card-thumb ' + this.props.thumbWidth} src={this.GetThumbToShow(card)}></img>
                  </div>
                </div>
              ))

            ) : <></>
          // <div className='deckBuilder-alert-message'>
          //   <span>Adicione cartas ao seu deck</span>
          // </div>

          : <></>
        }
        {this.props.showSpecialDeck || this.ShowAllCards()
          ? this.props.currDeck.specialCards.length > 0 ?
            this.props.currDeck.specialCards.map((card, i) =>

              Array.from({ length: card.amount }).map((_, idx) => (
                <div className='deckBuilder-item entrada' key={`${card.key}-${idx}`}>
                  <div onClick={() => { this.OnClickCard(card); }}>
                    {/* <h4 className='text-title'>{card.name}</h4> */}
                    <img alt="Thumbnail" className={'deckBuilder-card-thumb ' + this.props.thumbWidth} src={card.thumb}></img>
                  </div>
                </div>
              ))

            ) : <></>
          // <div className='deckBuilder-alert-message'>
          //   <span>Adicione cartas especiais ao seu deck</span>
          // </div>

          : <></>
        }
        {this.props.showFortressDeck || this.ShowAllCards()
          ? this.props.currDeck.fortressCards.length > 0 ?
            this.props.currDeck.fortressCards.map((card, i) =>

              Array.from({ length: card.amount }).map((_, idx) => (
                <div className='deckBuilder-item entrada' key={`${card.key}-${idx}`}>
                  <div onClick={() => { this.OnClickCard(card); }}>
                    {/* <h4 className='text-title'>{card.name}</h4> */}
                    <img alt="Thumbnail" className={'deckBuilder-card-thumb ' + this.props.thumbWidth} src={card.thumb}></img>
                  </div>
                </div>
              ))

            ) : <></>
          // <div className='deckBuilder-alert-message'>
          //   <span>Adicione uma Fortaleza ao seu deck</span>
          // </div>
          : <></>
        }
      </div>
    );
  }
}