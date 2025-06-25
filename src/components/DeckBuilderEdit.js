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

    if (!this.props.cardsToShow || !this.props.cardsToShow.length) {
      this.props.setCardsToShow(this.props.AvailableCards);
    }
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

  ChangeAmountOfCardInDeck(cardCode, amount) {
    let index = -1;
    this.props.currDeck.cards.forEach((card, i) => {
      if (card.code === cardCode) {
        index = i;
      }
    });

    if (index > -1) {
      this.props.ChangeAmountOfCardInDeck(index, amount);
      this.props.currDeck.mainCards = this.props.currDeck.cards.filter(card => !card.specialCard);
      this.props.currDeck.specialCards = this.props.currDeck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));
      this.props.currDeck.fortressCards = this.props.currDeck.cards.filter(card => !!this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));
      this.props.UpdateDeckListInSession();
      this.forceUpdate();
    }
  }
  ShowAllCard() {
    return (!this.props.showMainDeck && !this.props.showSpecialDeck && !this.props.showFortressDeck);
  }

  ShowPreviousCard(card) {
    const index = this.props.IndexOfCardInDeck(card);
    if (index <= 0) return;
    const prevCard = this.props.currDeck.cards[index - 1];
    this.props.setCarouselModalCard(prevCard);
    this.forceUpdate();
  }

  ShowNextCard(card) {
    const index = this.props.IndexOfCardInDeck(card);
    if (index >= (this.props.currDeck.cards.length - 1)) return;
    const nextCard = this.props.currDeck.cards[index + 1];
    this.props.setCarouselModalCard(nextCard);
    this.forceUpdate();
  }

  OnClickCard(card) {
    const _this = this;
    this.props.setCarouselBackAction({ action: (card) => { _this.ShowPreviousCard(card) } });
    this.props.setCarouselForwardAction({ action: (card) => { _this.ShowNextCard(card) } });
    this.props.setCarouselMinusAction({ action: (card) => { _this.ChangeAmountOfCardInDeck(card.code, -1) } });
    this.props.setCarouselPlusAction({ action: (card) => { _this.ChangeAmountOfCardInDeck(card.code, 1) } });

    this.props.setCarouselModalCard(card);
    this.props.setIsShowCarouselModal(true);
    this.forceUpdate();
  }

  render() {
    return (
      <div className={'deckBuilder-body-cards-container ' + this.props.thumbWidth}>
        {this.props.showMainDeck || this.ShowAllCard()
          ? this.props.currDeck.mainCards.length > 0 ?
            this.props.currDeck.mainCards.map((card, i) =>

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
          //   <span>Adicione cartas ao seu deck</span>
          // </div>

          : <></>
        }
        {this.props.showSpecialDeck || this.ShowAllCard()
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
        {this.props.showFortressDeck || this.ShowAllCard()
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