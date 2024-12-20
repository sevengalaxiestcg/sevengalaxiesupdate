import React from 'react';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';

import iconSearch from '../images/lupa.png';
import iconBack from '../images/voltar.png';
import iconMinus from '../images/_.png';
import iconPlus from '../images/+.png';
import iconInfo from '../images/social/Sobre.png';
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
    if (!this.props.cardsToShow || !this.props.cardsToShow.length) {
      this.props.setCardsToShow(this.props.AvailableCards);
    }
    this.props.setIsDeckEdit(true);
    this.props.setShowBottomMenu(true);
    this.props.setViewState(DeckBuilderViewStates.CardsList);
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
            {/* <div className='bt-deckBuilder bt-option bt-option-invert' onClick={() => { this.props.setIsShowModalOrderBy(true) }}>
              <img alt="Ordenação" src={iconOrdenar}></img>
            </div> */}
            <div className={ 'bt-deckBuilder bt-option bt-option-invert' } onClick={() => { this.props.ShowDeckInformations(); }}>
              <img alt="Informações sobre o deck" src={iconInfo} className={ (this.props.deckErrorMessages && this.props.deckErrorMessages.length ? ' text-danger' : '') }></img>
            </div>
            <div className='bt-deckBuilder bt-option bt-option-invert' onClick={() => { this.SendToSearchCard(); }}>
              <img alt="Filtro" src={iconSearch}></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export class DeckBuilderEditBody extends React.Component {

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
      this.props.currDeck.specialCards = this.props.currDeck.cards.filter(card => card.specialCard && !this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));
      this.props.currDeck.fortressCards = this.props.currDeck.cards.filter(card => !!this.props.IsCardTypeOf("FORTALEZA", card.cardTypes));
      this.props.UpdateDeckListInSession();
      this.forceUpdate();
    }
  }

  SetShowMainDeck (value) {
    this.props.setShowMainDeck(value);
    this.forceUpdate();
  }

  SetShowFortressDeck (value) {
    this.props.setShowFortressDeck(value);
    this.forceUpdate();
  }

  IsCategoryFilterSelected(category) {
    return (category === 'main' && !!this.props.showMainDeck) ||
           (category === 'specials' && !this.props.showMainDeck && !this.props.showFortressDeck) ||
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

  GetCardsCount(category) {
    let count = 0;
    if(category === 'main') this.props.currDeck.mainCards.forEach(p => count += p.amount);
    if(category === 'specials') this.props.currDeck.specialCards.forEach(p => count += p.amount);
    if(category === 'fortress') this.props.currDeck.fortressCards.forEach(p => count += p.amount);
    return count;
  }

  ShowPreviousCard (card) {
    const index = this.props.IndexOfCardInDeck(card);
    if (index <= 0) return;
    const prevCard = this.props.currDeck.cards[index-1];
    this.props.setCarouselModalCard(prevCard);
    this.forceUpdate();
  }

  ShowNextCard (card) {
    const index = this.props.IndexOfCardInDeck(card);
    if (index >= (this.props.currDeck.cards.length-1)) return;
    const nextCard = this.props.currDeck.cards[index+1];
    this.props.setCarouselModalCard(nextCard);
    this.forceUpdate();
  }

  OnClickCard (card) {
    const _this = this;
    this.props.setCarouselBackAction({action: (card) => {_this.ShowPreviousCard(card)}});
    this.props.setCarouselForwardAction({action: (card) => {_this.ShowNextCard(card)}});
    this.props.setCarouselMinusAction({action: (card) => {_this.ChangeAmountOfCardInDeck(card.code, -1)}});
    this.props.setCarouselPlusAction({action: (card) => {_this.ChangeAmountOfCardInDeck(card.code, 1)}});

    this.props.setCarouselModalCard(card);
    this.props.setIsShowCarouselModal(true);
    this.forceUpdate();
  }

  render () {
    return (
      <>
        <div className='deckBuilder-cards-categories'>
          <div className={ this.GetCategoryClass('main') }
            onClick={() => { this.SetShowMainDeck(true); this.SetShowFortressDeck(false); }}>
            <span className='count'>{ this.GetCardsCount('main') }</span>
            <span className='title'> Principal</span>
          </div>
          <div className={ this.GetCategoryClass('specials') }
            onClick={() => { this.SetShowMainDeck(false); this.SetShowFortressDeck(false); }}>
            <span className='count'>{ this.GetCardsCount('specials') }</span>
            <span className='title'> Especiais</span>
          </div>
          <div className={ this.GetCategoryClass('fortress') }
            onClick={() => { this.SetShowMainDeck(false); this.SetShowFortressDeck(true); }}>
            <span className='count'>{ this.GetCardsCount('fortress') }</span>
            <span className='title'> Fortaleza</span>
          </div>
        </div>
        
        {!!this.props.showMainDeck ?
          <div className='deckBuilder-edit-block'>
            <h4>DECK PRINCIPAL</h4>
            {this.props.currDeck.mainCards.length > 0 ? 
              this.props.currDeck.mainCards.map((card, i) =>
                <div className='deckBuilder-item' key={card.key}>
                  <div onClick={() => { this.OnClickCard(card); }}>
                    <h4 className='text-title'>{card.name}</h4>
                    <img alt="Thumbnail" className='deckBuilder-card-thumb' src={card.thumb}></img>
                  </div>
                  <div className='deckBuilder-item-nameBox'>
                    <div className='bt-deckBuilder bt-deck-editName' 
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, -1) }}>
                      <img alt="Decrementar" className='icon-img' src={iconMinus}></img>
                    </div>
                    <div className='deckBuilder-span-cardAmount'>
                      <span>{card.amount??0}/2</span>
                    </div>
                    <div className='bt-deckBuilder bt-deck-editName'
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, 1) }}>
                      <img alt="Incrementar" className='icon-img' src={iconPlus}></img>
                    </div>
                  </div>
                </div>
              ) : 
              // <h5 className='padding-bottom-1'>Adicione cartas ao seu novo deck...</h5>
              <></>
            }
          </div>
          : <></>
        }
        {!this.props.showMainDeck && !this.props.showFortressDeck ?
          <div className='deckBuilder-edit-block'>
            <h4>DECK ESPECIAL</h4>
            {this.props.currDeck.specialCards.length > 0 ?
              this.props.currDeck.specialCards.map((card, i) =>
                <div className='deckBuilder-item' key={card.key}>
                  <div>
                    <h4 className='text-title'>{card.name.split(" (")[0]}</h4>
                    <img alt="Thumbnail" className='deckBuilder-card-thumb' src={card.thumb}></img>
                  </div>
                  <div className='deckBuilder-item-nameBox'>
                    <div className='bt-deckBuilder bt-deck-editName' 
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, -1) }}>
                      <img alt="Decrementar" className='icon-img' src={iconMinus}></img>
                    </div>
                    <div className='deckBuilder-span-cardAmount'>
                      <span>{card.amount??0}/{this.props.IsCardTypeOf("RECURSO", card.cardTypes) ? '1' : '8'}</span>
                    </div>
                    <div className='bt-deckBuilder bt-deck-editName'
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, 1) }}>
                      <img alt="Incrementar" className='icon-img' src={iconPlus}></img>
                    </div>
                  </div>
                </div>
              ) :
              // <h5 className='padding-bottom-1'>Adicione cartas ao seu novo deck...</h5>
              <></>
            }
          </div>
          : <></>
        }
        {!!this.props.showFortressDeck ?
          <div className='deckBuilder-edit-block'>
            <h4>FORTALEZA</h4>
            {this.props.currDeck.fortressCards.length > 0 ?
              this.props.currDeck.fortressCards.map((card, i) =>
                <div className='deckBuilder-item' key={card.key}>
                  <div>
                    <h4 className='text-title'>{card.name.split(" (")[0]}</h4>
                    <img alt="Thumbnail" className='deckBuilder-card-thumb' src={card.thumb}></img>
                  </div>
                  <div className='deckBuilder-item-nameBox'>
                    <div className='bt-deckBuilder bt-deck-editName' 
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, -1) }}>
                      <img alt="Decrementar" className='icon-img' src={iconMinus}></img>
                    </div>
                    <div className='deckBuilder-span-cardAmount'>
                      <span>{card.amount??0}/1</span>
                    </div>
                    <div className='bt-deckBuilder bt-deck-editName'
                      onClick={() => { this.ChangeAmountOfCardInDeck(card.code, 1) }}>
                      <img alt="Incrementar" className='icon-img' src={iconPlus}></img>
                    </div>
                  </div>
                </div>
              ) :
              // <h5 className='padding-bottom-1'>Adicione cartas ao seu novo deck...</h5>
              <></>
            }
          </div>
          : <></>
        }
      </>
    );
  }
}