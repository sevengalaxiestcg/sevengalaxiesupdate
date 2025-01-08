import React, { useEffect, useState } from 'react';

import ChangeBackground from '../tools/ChangeBackground';
import SetSessionMatch from '../tools/SetSessionMatch';

import Toolbar from '../components/Toolbar';
import { ModalTransparent, ModalOptionsTransparent, ModalTransparentButtons, ModalTransparentCarousel } from '../components/ModalTransparent';
import { AlertModal, FullScreenModal } from '../components/Modal';
import { DeckBuilderDecksListBody, DeckBuilderDecksListHeader } from '../components/DeckBuilderList';
import { DeckBuilderEditBody, DeckBuilderEditHeader } from '../components/DeckBuilderEdit';
import { CardsListBody, CardsListHeader } from '../components/CardsList';
import { DeckBuilderCardsAdvancedFilter, DeckBuilderCardsAdvancedFilterHeader } from '../components/DeckBuilderCardsAdvancedFilter';

import './DeckBuilder.css';

import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { basicOrderingCardsOptions, basicOrderingDecksOptions, OrderingDirections, OrderingOptions } from '../models/OrderingOptions';

import thumbPadrao from '../background/SevenG_01.jpg';
import iconCardsList from '../images/menu/cards.png';
import iconDecksList from '../images/menu/decks.png';
import { cardsThumbs } from '../pseudoDatabases/images';
import { DecksCardsComponentBase } from '../components/DecksCardsComponentBase';
let cardsLibrary = require('../pseudoDatabases/SevenGalaxies_Cards_Todos.json');

const downloadPath = "/storage/emulated/0/Download";
const appPath = process.env.PUBLIC_URL;

export default function CardsLibrary() {

  //#region State Variables

  const [refresh, setRefresh] = useState(1);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [session, setSession] = useState({ rodada: undefined, fortaleza: undefined });

  const [isShowDebug, setIsShowDebug] = useState(false);
  const [viewState, setViewState] = useState(DeckBuilderViewStates.CardsList);
  const [AvailableCards, setAvailableCards] = useState(GetAllAvailableCards());
  const [DeckList, setDeckList] = useState(GetDeckListFromSession());

  const [showBottomMenu, setShowBottomMenu] = useState(true);
  const [showBodyInnerTopShadow, setShowBodyInnerTopShadow] = useState(true);

  const [orderingCardsOptions, setOrderingCardsOptions] = useState(basicOrderingCardsOptions);
  const [orderingDecksOptions, setOrderingDecksOptions] = useState(basicOrderingDecksOptions);
  const [lastOrderingCardsOption, setLastOrderingCardsOption] = useState({ value: OrderingOptions.Code, direction: OrderingDirections.Ascending });
  const [lastOrderingDecksOption, setLastOrderingDecksOption] = useState({ value: OrderingOptions.DateCreated, direction: OrderingDirections.Ascending });
  const [galaxyFilters, setGalaxyFilters] = useState([]);
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [cardEffectsCosts, setCardEffectsCosts] = useState([]);

  const [countNormals, setCountNormals] = useState(0);
  const [countSpecials, setCountSpecials] = useState(0);
  const [countFortress, setCountFortress] = useState(0);

  const [modalTransparentContent, setModalTransparentContent] = useState([]);
  const [buttonsModalButtons, setButtonsModalButtons] = useState([]);
  const [isShowModalButtons, setIsShowModalButtons] = useState(false);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [onActionAlertModal, setOnActionAlertModal] = useState();
  const [actionParamsAlertModal, setActionParamsAlertModal] = useState();
  const [onCloseAlertModal, setOnCloseAlertModal] = useState();
  const [closeParamsAlertModal, setCloseParamsAlertModal] = useState();
  const [messageAlertModal, setMessageAlertModal] = useState("");
  const [acceptButtonNameAlertModal, setAcceptButtonNameAlertModal] = useState("Sim");
  const [cancelButtonNameAlertModal, setCancelButtonNameAlertModal] = useState("Não");
  const [isCancelButtonVisibleAlertModal, setIsCancelButtonVisibleAlertModal] = useState(true);

  const [isShowRules, setIsShowRules] = useState(false);
  const [isShowModalDeckInfos, setIsShowModalDeckInfos] = useState(false);
  const [DeckListToShow, setDeckListToShow] = useState([]);
  const [isShowEditDeckName, setIsShowEditDeckName] = useState(-1);
  const [DecksSearchTerm, setDecksSearchTerm] = useState(undefined);
  const [isDeckEdit, setIsDeckEdit] = useState(false);
  const [currDeck, setCurrDeck] = useState();
  const [showMainDeck, setShowMainDeck] = useState(true);
  const [showFortressDeck, setShowFortressDeck] = useState(false);

  const [cardsToShow, setCardsToShow] = useState(GetAllAvailableCards());
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [isShowModalOrderBy, setIsShowModalOrderBy] = useState(false);

  const [isShowCarouselModal, setIsShowCarouselModal] = useState(false);
  const [carouselModalCard, setCarouselModalCard] = useState({});
  const [CarouselBackAction, setCarouselBackAction] = useState({ action: () => { } });
  const [CarouselForwardAction, setCarouselForwardAction] = useState({ action: () => { } });
  const [CarouselMinusAction, setCarouselMinusAction] = useState({ action: () => { } });
  const [CarouselPlusAction, setCarouselPlusAction] = useState({ action: () => { } });
  const [thumbWidth, setThumbWidth] = useState(window.localStorage.getItem("sevengalaxies@thumbWidth") ?? "small");

  //#endregion

  //#region App Init

  useEffect(() => {
    ChangeBackground(0);
  }, []);

  useEffect(() => {
    const sessionRodada = JSON.parse(sessionStorage.getItem("sevengalaxies@rodada"));
    const sessionFortaleza = JSON.parse(sessionStorage.getItem("sevengalaxies@fortaleza"));
    setSession({ rodada: sessionRodada, fortaleza: sessionFortaleza });
    setThumbWidth(window.localStorage.getItem("sevengalaxies@thumbWidth") ?? "small");
  }, []);

  useEffect(() => {
    if (session.rodada !== undefined && session.fortaleza !== undefined)
      SetSessionMatch(session.rodada, session.fortaleza);
  }, [session]);

  //#endregion

  //#region Page Init

  useEffect(() => {
    AvailableCards.map((card) => {
      if (!card.thumb || card.thumb === "") card.thumb = thumbPadrao;
    });
    setAvailableCards(AvailableCards);
    setCardsToShow(AvailableCards);
    SetCounts(AvailableCards, true);
    OrderCardsByOption();
    setCarouselModalCard(AvailableCards[0]);
  }, [AvailableCards]);

  useEffect(() => {
    DeckList.map((deck) => {
      if (!deck.name || deck.name === "") {
        deck.name = "Novo Deck";
        deck.thumb = thumbPadrao;
      }
      if (!deck.cards) deck.cards = [];
      deck.cards.map((card, i) => {
        if (!card.name || card.name === "") card.name = "Card #" + i;
        if (!card.thumb || card.thumb === "") card.thumb = thumbPadrao;
      });
    });
    OrderDecksByOption(lastOrderingDecksOption);
  }, [DeckList]);

  useEffect(() => {
    var cardEffectsCosts = [];
    AvailableCards.forEach(card => {
      card.effects.forEach(effect => {
        effect.costs.forEach(cost => {
          if (!cardEffectsCosts.includes(parseInt(cost.costAmount))) {
            cardEffectsCosts.push(parseInt(cost.costAmount));
          }
        });
      });
    });
    cardEffectsCosts = cardEffectsCosts.sort((a, b) => { return a - b; });
    setCardEffectsCosts(cardEffectsCosts);
  }, [AvailableCards]);

  //#endregion

  //#region Globals

  function GetAllAvailableCards() {
    cardsLibrary.cards.forEach(card => {
      if (!card.thumb || card.thumb === thumbPadrao) {
        let cardCodeArr = card.code.split(" - ");
        if (cardCodeArr.length < 2) {
          cardCodeArr = card.code.split("-");
        }
        if (cardCodeArr[1].startsWith("0")) {
          cardCodeArr[1] = cardCodeArr[1].substring(1);
        }
        const cardCode = cardCodeArr[0] + " - " + cardCodeArr[1];
        const filtered = cardsThumbs().filter(p => p.key === cardCode);
        card.thumb = filtered[0].image;
      }
    });
    return cardsLibrary.cards;
  }

  function GetDeckListFromSession() {
    return JSON.parse(window.localStorage.getItem("sevengalaxies@deckList") ?? "[{}]");
  }

  const Base = new DecksCardsComponentBase(setCountNormals, setCountSpecials, setCountFortress, DeckList, setDeckList, currDeck, setViewState, setIsDeckEdit, setShowBottomMenu,
    setShowBodyInnerTopShadow, isDeckEdit, viewState, setRefresh, galaxyFilters, setGalaxyFilters, orderingDecksOptions, orderingCardsOptions, setDecksSearchTerm,
    setDeckListToShow, lastOrderingDecksOption, setLastOrderingDecksOption, setOrderingDecksOptions, setCurrDeck, AvailableCards, setAvailableCards, advancedFilters, categoryFilters,
    setAdvancedFilters, setCategoryFilters, cardsToShow, setCardsToShow, lastOrderingCardsOption, setLastOrderingCardsOption, DecksSearchTerm, DeckListToShow,
    setOrderingCardsOptions, thumbWidth, setThumbWidth);

  function Refresh() {
    return Base.Refresh();
  }

  function onScrollBody(event) {
    return Base.onScrollBody(event);
  }

  function onClickMenuBottomItem(viewState) {
    return Base.onClickMenuBottomItem(viewState);
  }

  function SetDeckListInSession(deckList) {
    return Base.SetDeckListInSession(deckList);
  }

  function UpdateDeckListInSession() {
    return Base.UpdateDeckListInSession();
  }

  function ChangeAmountOfCardInDeck(index, amount) {
    return Base.ChangeAmountOfCardInDeck(index, amount);
  }

  function SearchCard(term) {
    return Base.SearchCard(term);
  }

  function SearchDeck(term) {
    return Base.SearchDeck(term);
  }

  function IsCardTypeOf(term, cardTypes) {
    return Base.IsCardTypeOf(term, cardTypes);
  }

  function HasFilterApplied() {
    return Base.HasFilterApplied();
  }

  function ClearCardsFilters() {
    return Base.ClearCardsFilters();
  }

  function SetCounts(cards, isSetState) {
    return Base.SetCounts(cards, isSetState);
  }

  function GetCategoryClass(category) {
    return Base.GetCategoryClass(category);
  }

  function IsCategoryFilterSelected(category) {
    return Base.IsCategoryFilterSelected(category);
  }

  function ToggleCategoryFilterSelected(category) {
    return Base.ToggleCategoryFilterSelected(category);
  }

  function ToggleGalaxyFilterSelected(galaxy) {
    return Base.ToggleGalaxyFilterSelected(galaxy);
  }

  function ToggleFilter(filterType, value) {
    return Base.ToggleFilter(filterType, value);
  }

  function GetGalaxyClass(galaxy) {
    return Base.GetGalaxyClass(galaxy);
  }

  function GetFilterClass(filterType, value) {
    return Base.GetFilterClass(filterType, value);
  }


  function OrderCardsByOption(option) {
    return Base.OrderCardsByOption(option);
  }

  function OrderDecksByOption(option) {
    return Base.OrderDecksByOption(option);
  }

  function OrderByOption(option) {
    return Base.OrderByOption(option);
  }

  function GetOrderingOptions() {
    return Base.GetOrderingOptions();
  }

  function GetCardAmountInDeck(card) {
    return Base.GetCardAmountInDeck(card);
  }

  function GetMaximumCardAmount(card) {
    return Base.GetMaximumCardAmount(card);
  }

  function IndexOfCardInDeck(card) {
    return Base.IndexOfCardInDeck(card);
  }

  function ExecuteCarouselBackAction(card) {
    (CarouselBackAction.action)(card);
  }

  function ExecuteCarouselForwardAction(card) {
    (CarouselForwardAction.action)(card);
  }

  function ExecuteCarouselMinusAction(card) {
    (CarouselMinusAction.action)(card);
  }

  function ExecuteCarouselPlusAction(card) {
    (CarouselPlusAction.action)(card);
  }

  //#endregion

  return (
    <>
      <Toolbar refresh={() => Refresh()} />

      <main key={refresh}>
        <div className="deckBuilder">
          <div className='deckBuilder-container'>

            {/* HEADER */}
            <div className='deckBuilder-header'>
              {viewState === DeckBuilderViewStates.CardsList
                ? <CardsListHeader setViewState={setViewState}
                  setShowBottomMenu={setShowBottomMenu}
                  cardsList={cardsToShow}
                  SearchCard={SearchCard}
                  HasFilterApplied={HasFilterApplied}
                  IsCategoryFilterSelected={IsCategoryFilterSelected}
                  ToggleCategoryFilterSelected={ToggleCategoryFilterSelected}
                  ToggleGalaxyFilterSelected={ToggleGalaxyFilterSelected}
                  GetGalaxyClass={GetGalaxyClass}
                  GetCategoryClass={GetCategoryClass}
                  IsCardTypeOf={IsCardTypeOf}
                  countNormals={countNormals}
                  countSpecials={countSpecials}
                  countFortress={countFortress}
                  setIsShowModalOrderBy={setIsShowModalOrderBy}
                  isDeckEdit={isDeckEdit}
                  thumbWidth={thumbWidth}
                  setThumbWidth={setThumbWidth}
                />
                : <></>
              }
              {viewState === DeckBuilderViewStates.AdvancedSearchCard
                ? <DeckBuilderCardsAdvancedFilterHeader setViewState={setViewState}
                  setShowBottomMenu={setShowBottomMenu}
                  isDeckEdit={isDeckEdit}
                  SearchCard={SearchCard}
                  IsCategoryFilterSelected={IsCategoryFilterSelected}
                  ToggleGalaxyFilterSelected={ToggleGalaxyFilterSelected}
                  ToggleCategoryFilterSelected={ToggleCategoryFilterSelected}
                  GetGalaxyClass={GetGalaxyClass}
                  GetCategoryClass={GetCategoryClass}
                  countNormals={countNormals}
                  countSpecials={countSpecials}
                  countFortress={countFortress}
                  thumbWidth={thumbWidth}
                  setThumbWidth={setThumbWidth}
                  ClearCardsFilters={ClearCardsFilters}
                />
                : <></>
              }
            </div>

            {/* BODY */}
            <div onScroll={onScrollBody}
              className={'deckBuilder-body' + (showBodyInnerTopShadow ? '' : ' has-shadow') + (viewState === DeckBuilderViewStates.DeckEdit ? ' deckList-body' : '')}>

              {viewState === DeckBuilderViewStates.CardsList
                ? <div className={'deckBuilder-body-cards-container ' + thumbWidth}>
                  <CardsListBody setViewState={setViewState}
                    cardsList={cardsToShow}
                    currDeck={currDeck}
                    isDeckEdit={isDeckEdit}
                    ChangeAmountOfCardInDeck={ChangeAmountOfCardInDeck}
                    UpdateDeckListInSession={UpdateDeckListInSession}
                    IsCardTypeOf={IsCardTypeOf}
                    GetCardAmountInDeck={GetCardAmountInDeck}
                    GetMaximumCardAmount={GetMaximumCardAmount}
                    IndexOfCardInDeck={IndexOfCardInDeck}

                    setIsShowAlertModal={setIsShowAlertModal}
                    setActionParamsAlertModal={setActionParamsAlertModal}
                    setOnActionAlertModal={setOnActionAlertModal}
                    setCloseParamsAlertModal={setCloseParamsAlertModal}
                    setOnCloseAlertModal={setOnCloseAlertModal}
                    setMessageAlertModal={setMessageAlertModal}
                    setAcceptButtonNameAlertModal={setAcceptButtonNameAlertModal}
                    setCancelButtonNameAlertModal={setCancelButtonNameAlertModal}
                    setIsCancelButtonVisibleAlertModal={setIsCancelButtonVisibleAlertModal}
                    setIsShowCarouselModal={setIsShowCarouselModal}
                    setCarouselModalCard={setCarouselModalCard}
                    setCarouselBackAction={setCarouselBackAction}
                    setCarouselForwardAction={setCarouselForwardAction}
                    setCarouselMinusAction={setCarouselMinusAction}
                    setCarouselPlusAction={setCarouselPlusAction}
                    thumbWidth={thumbWidth}
                    setThumbWidth={setThumbWidth}
                  />
                </div>
                : <></>
              }
              {viewState === DeckBuilderViewStates.AdvancedSearchCard
                ? <div className='deckBuilder-body-filters-container'>
                  <DeckBuilderCardsAdvancedFilter setViewState={setViewState}
                    setShowBottomMenu={setShowBottomMenu}
                    isDeckEdit={isDeckEdit}
                    SearchCard={SearchCard}
                    GetFilterClass={GetFilterClass}
                    ToggleFilter={ToggleFilter}
                    IsCategoryFilterSelected={IsCategoryFilterSelected}
                    ClearCardsFilters={ClearCardsFilters}
                    cardEffectsCosts={cardEffectsCosts}
                    countNormals={countNormals}
                    countSpecials={countSpecials}
                    countFortress={countFortress}
                    thumbWidth={thumbWidth}
                    setThumbWidth={setThumbWidth}
                  />
                </div>
                : <></>
              }
            </div>

            {/* FOOTER */}

          </div>
        </div>

        <ModalOptionsTransparent
          onOptionSelected={OrderByOption} options={GetOrderingOptions()}
          isShowModal={isShowModalOrderBy} setIsShowModal={setIsShowModalOrderBy}
        />

        <ModalTransparent modalTitle={`${currDeck?.name ?? ""}`}
          content={modalTransparentContent}
          isShowModal={isShowModalDeckInfos} setIsShowModal={setIsShowModalDeckInfos}
        />

        <ModalTransparentButtons
          buttons={buttonsModalButtons}
          isShowModal={isShowModalButtons} setIsShowModal={setIsShowModalButtons}
        />

        <FullScreenModal isShowModal={isShowRules} setIsShowModal={setIsShowRules}
          title={'Regras de Montagem de Decks'} body={'<ol><li>teste</li></ol>'} footer={''}
        />

        <ModalTransparentCarousel isShowModal={isShowCarouselModal} setIsShowModal={setIsShowCarouselModal}
          isShowFooter={false}
          title={carouselModalCard.name} subtitle={carouselModalCard.group} card={carouselModalCard}
          GetCardAmountInDeck={GetCardAmountInDeck} GetMaximumCardAmount={GetMaximumCardAmount}
          backAction={ExecuteCarouselBackAction} forwardAction={ExecuteCarouselForwardAction}
          minusAction={ExecuteCarouselMinusAction} plusAction={ExecuteCarouselPlusAction}
        />

        {isShowAlertModal
          ? <AlertModal
            onAction={onActionAlertModal}
            actionParams={actionParamsAlertModal}
            onClose={onCloseAlertModal}
            closeParams={closeParamsAlertModal}
            message={messageAlertModal}
            actionName={acceptButtonNameAlertModal}
            cancelName={cancelButtonNameAlertModal}
            cancelVisible={isCancelButtonVisibleAlertModal}
          />
          : <></>
        }

      </main>
      {/* <div className="corporation"> © {anoAtual} 7G Universe</div> */}
    </>
  );

}