import React, { useEffect, useState } from 'react';

import ChangeBackground from '../tools/ChangeBackground';
import SetSessionMatch from '../tools/SetSessionMatch';
import ActiveAnimation from '../tools/ActiveAnimation';

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
let CardsLibrary = require('../pseudoDatabases/SevenGalaxies_Cards_Todos.json');

const downloadPath = "/storage/emulated/0/Download";
const appPath = process.env.PUBLIC_URL;

export default function DeckBuilder() {

  //#region State Variables

  const [refresh, setRefresh] = useState(1);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [session, setSession] = useState({ rodada: undefined, fortaleza: undefined });

  const [isShowDebug, setIsShowDebug] = useState(false);
  const [viewState, setViewState] = useState(DeckBuilderViewStates.DecksList);
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
  const [DecksSearchTerm, setDecksSearchTerm] = useState();
  const [isDeckEdit, setIsDeckEdit] = useState(false);
  const [currDeck, setCurrDeck] = useState();
  const [showMainDeck, setShowMainDeck] = useState(true);
  const [showSpecialDeck, setShowSpecialDeck] = useState(true);
  const [showFortressDeck, setShowFortressDeck] = useState(false);

  const [cardsToShow, setCardsToShow] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [isShowModalOrderBy, setIsShowModalOrderBy] = useState(false);

  const [isShowCarouselModal, setIsShowCarouselModal] = useState(false);
  const [carouselModalCard, setCarouselModalCard] = useState({});
  const [CarouselBackAction, setCarouselBackAction] = useState({ action: () => { } });
  const [CarouselForwardAction, setCarouselForwardAction] = useState({ action: () => { } });
  const [CarouselMinusAction, setCarouselMinusAction] = useState({ action: () => { } });
  const [CarouselPlusAction, setCarouselPlusAction] = useState({ action: () => { } });
  const [CarouselThumbAction, setCarouselThumbAction] = useState({ action: () => { } });
  const [CarouselThumbCard, setCarouselThumbCard] = useState();

  const [deckErrorMessages, setDeckErrorMessages] = useState([]);
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

  // MUST BE EQUAL to the one in Cards.js
  function GetAllAvailableCards() {
    CardsLibrary.cards.forEach(card => {
      if (!card.thumb || card.thumb === thumbPadrao) {
        const thumbs = cardsThumbs();
        const filtered = thumbs.filter(p => p.key === card.key);
        if (!filtered.length) debugger;
        else {
          card.thumb = filtered[0].image;
          card.isAlternateArt = card.key.endsWith("-B");
        }
      }
    });
    return CardsLibrary.cards;
  }

  function GetDeckListFromSession() {
    return JSON.parse(window.localStorage.getItem("sevengalaxies@deckList") ?? "[{}]");
  }

  const Base = new DecksCardsComponentBase(setCountNormals, setCountSpecials, setCountFortress, DeckList, setDeckList, currDeck, setViewState, setIsDeckEdit, setShowBottomMenu,
      setShowBodyInnerTopShadow, isDeckEdit, viewState, setRefresh, galaxyFilters, setGalaxyFilters, orderingDecksOptions, orderingCardsOptions, setDecksSearchTerm,
      setDeckListToShow, lastOrderingDecksOption, setLastOrderingDecksOption, setOrderingDecksOptions, setCurrDeck, AvailableCards, setAvailableCards, advancedFilters, categoryFilters,
      setAdvancedFilters, setCategoryFilters, cardsToShow, setCardsToShow, lastOrderingCardsOption, setLastOrderingCardsOption, DecksSearchTerm, DeckListToShow,
      setOrderingCardsOptions, setModalTransparentContent, setIsShowModalDeckInfos, deckErrorMessages, setDeckErrorMessages, thumbWidth, setThumbWidth);

  function Refresh() {
    return Base.Refresh();
  }

  function onScrollBody(event) {
    return Base.onScrollBody(event);
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

  function GetCurrDeckCountNormals() {
    return Base.GetCurrDeckCountNormals();
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

  function ExecuteCarouselThumbAction(card) {
    (CarouselThumbAction.action)(card, !card.isAlternateArtSelected);
  }

  function ShowDeckInformations() {
    return Base.ShowDeckInformations();
  }

  function OrderDeckCards(cardsList) {
    return Base.OrderDeckCards(cardsList);
  }

  function TestDeck(deck) {
    return Base.TestDeck(deck);
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
                  GetCurrDeckCountNormals={GetCurrDeckCountNormals}
                  countNormals={countNormals}
                  countSpecials={countSpecials}
                  countFortress={countFortress}
                  setIsShowModalOrderBy={setIsShowModalOrderBy}
                  isDeckEdit={isDeckEdit}
                  ShowDeckInformations={ShowDeckInformations}
                  deckErrorMessages={deckErrorMessages}
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
              {viewState === DeckBuilderViewStates.DecksList
                ? <DeckBuilderDecksListHeader
                  SearchDeck={SearchDeck}
                  setCurrDeck={setCurrDeck}
                  setViewState={setViewState}
                  HasFilterApplied={HasFilterApplied}
                  ToggleGalaxyFilterSelected={ToggleGalaxyFilterSelected}
                  GetGalaxyClass={GetGalaxyClass}
                  setShowBottomMenu={setShowBottomMenu}
                  DeckList={DeckList} SetDeckListInSession={SetDeckListInSession}
                  DeckListToShow={DeckListToShow}
                  thumbPadrao={thumbPadrao}
                  setShowMainDeck={setShowMainDeck}
                  setShowSpecialDeck={setShowSpecialDeck}
                  setShowFortressDeck={setShowFortressDeck}
                  setIsShowModalButtons={setIsShowModalButtons}
                  setButtonsModalButtons={setButtonsModalButtons}
                  setIsShowRules={setIsShowRules}
                  setIsShowModalOrderBy={setIsShowModalOrderBy}
                  setIsDeckEdit={setIsDeckEdit}
                  AvailableCards={AvailableCards}
                  setCardsToShow={setCardsToShow}
                  thumbWidth={thumbWidth}
                  setThumbWidth={setThumbWidth}
                  IsCardTypeOf={IsCardTypeOf}
                />
                : <></>
              }
              {viewState === DeckBuilderViewStates.DeckEdit
                ? <DeckBuilderEditHeader
                  setViewState={setViewState}
                  currDeck={currDeck}
                  setCurrDeck={setCurrDeck}
                  SearchCard={SearchCard}
                  setIsDeckEdit={setIsDeckEdit}
                  setShowBottomMenu={setShowBottomMenu}
                  ClearCardsFilters={ClearCardsFilters}
                  ShowDeckInformations={ShowDeckInformations}
                  setIsShowModalOrderBy={setIsShowModalOrderBy}
                  // setIsShowModal={setIsShowModalDeckInfos}
                  // setModalContent={setModalTransparentContent}
                  cardsToShow={cardsToShow} setCardsToShow={setCardsToShow}
                  AvailableCards={AvailableCards} setAvailableCards={setAvailableCards}
                  deckErrorMessages={deckErrorMessages}
                  setShowMainDeck={setShowMainDeck}
                  setShowSpecialDeck={setShowSpecialDeck}
                  setShowFortressDeck={setShowFortressDeck}
                  showMainDeck={showMainDeck}
                  showSpecialDeck={showSpecialDeck}
                  showFortressDeck={showFortressDeck}
                  // SetCounts={SetCounts}
                  thumbWidth={thumbWidth}
                  setThumbWidth={setThumbWidth}
                  ChangeAmountOfCardInDeck={ChangeAmountOfCardInDeck}
                  UpdateDeckListInSession={UpdateDeckListInSession}
                  IsCardTypeOf={IsCardTypeOf}
                  IndexOfCardInDeck={IndexOfCardInDeck}

                />
                : <></>
              }
            </div>

            {/* BODY */}
            <div onScroll={onScrollBody}
              className={'deckBuilder-body' + (showBodyInnerTopShadow ? '' : ' has-shadow') + (viewState === DeckBuilderViewStates.DeckEdit ? ' deckList-body' : '')}>

              {viewState === DeckBuilderViewStates.CardsList
                ? <div className={'deckBuilder-body-cards-container ' + (isDeckEdit && thumbWidth == 'mini' ? 'small' : thumbWidth)}>
                  <CardsListBody setViewState={setViewState}
                    cardsList={cardsToShow}
                    AvailableCards={AvailableCards} setAvailableCards={setAvailableCards}
                    currDeck={currDeck}
                    isDeckEdit={isDeckEdit}
                    ChangeAmountOfCardInDeck={ChangeAmountOfCardInDeck}
                    UpdateDeckListInSession={UpdateDeckListInSession}
                    IsCardTypeOf={IsCardTypeOf}
                    GetCurrDeckCountNormals={GetCurrDeckCountNormals}
                    showBottomMenu={showBottomMenu}
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
                    setCarouselThumbAction={setCarouselThumbAction}
                    setCarouselThumbCard={setCarouselThumbCard}
                    OrderDeckCards={OrderDeckCards}
                    TestDeck={TestDeck}
                    setDeckErrorMessages={setDeckErrorMessages}
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
                  />
                </div>
                : <></>
              }
              {viewState === DeckBuilderViewStates.DecksList
                ? <DeckBuilderDecksListBody
                  DeckList={DeckListToShow}
                  SetDeckListInSession={SetDeckListInSession}
                  isShowEditDeckName={isShowEditDeckName} setIsShowEditDeckName={setIsShowEditDeckName}
                  setCurrDeck={setCurrDeck}
                  setViewState={setViewState}
                  cardsToShow={cardsToShow} setCardsToShow={setCardsToShow}
                  setShowBottomMenu={setShowBottomMenu}
                  IsCardTypeOf={IsCardTypeOf}
                  setShowMainDeck={setShowMainDeck}
                  setShowSpecialDeck={setShowSpecialDeck}
                  setShowFortressDeck={setShowFortressDeck}
                  setIsShowModalButtons={setIsShowModalButtons}
                  setButtonsModalButtons={setButtonsModalButtons}

                  setIsShowAlertModal={setIsShowAlertModal}
                  setActionParamsAlertModal={setActionParamsAlertModal}
                  setOnActionAlertModal={setOnActionAlertModal}
                  setCloseParamsAlertModal={setCloseParamsAlertModal}
                  setOnCloseAlertModal={setOnCloseAlertModal}
                  setMessageAlertModal={setMessageAlertModal}
                  setAcceptButtonNameAlertModal={setAcceptButtonNameAlertModal}
                  setCancelButtonNameAlertModal={setCancelButtonNameAlertModal}
                  setIsCancelButtonVisibleAlertModal={setIsCancelButtonVisibleAlertModal}
                  OrderDeckCards={OrderDeckCards}
                  TestDeck={TestDeck}
                  setDeckErrorMessages={setDeckErrorMessages}
                />
                : <></>
              }
              {viewState === DeckBuilderViewStates.DeckEdit
                ? <DeckBuilderEditBody
                  setViewState={setViewState}
                  availableCards={AvailableCards}
                  cardsList={cardsToShow}
                  currDeck={currDeck} setCurrDeck={setCurrDeck}
                  ChangeAmountOfCardInDeck={ChangeAmountOfCardInDeck}
                  UpdateDeckListInSession={UpdateDeckListInSession}
                  IsCardTypeOf={IsCardTypeOf}
                  showMainDeck={showMainDeck} setShowMainDeck={setShowMainDeck}
                  showSpecialDeck={showSpecialDeck} setShowSpecialDeck={setShowSpecialDeck}
                  showFortressDeck={showFortressDeck} setShowFortressDeck={setShowFortressDeck}
                  IndexOfCardInDeck={IndexOfCardInDeck}
                  thumbWidth={thumbWidth}
                  setThumbWidth={setThumbWidth}

                  setIsShowCarouselModal={setIsShowCarouselModal}
                  setCarouselModalCard={setCarouselModalCard}
                  setCarouselBackAction={setCarouselBackAction}
                  setCarouselForwardAction={setCarouselForwardAction}
                  setCarouselMinusAction={setCarouselMinusAction}
                  setCarouselPlusAction={setCarouselPlusAction}
                  setCarouselThumbAction={setCarouselThumbAction}
                  setCarouselThumbCard={setCarouselThumbCard}

                  setDeckErrorMessages={setDeckErrorMessages}
                  TestDeck={TestDeck}
                />
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
          title={'Regras de Construção de Decks'}
          body={`
            <p>Em todos os modos de jogo e formatos de deck, os decks devem conter de 30 a 40 cards, com no máximo duas cópias de cada card.</p>
            <p>O deck especial não possui limite de cards ou de cópias e pode incluir cards de qualquer galáxia, independentemente do formato de deck. No aplicativo, entretanto, há um limite de 8 cópias para cada card especial.</p>
            <p>Os cards de evento devem pertencer à mesma galáxia da sua fortaleza.</p>
            <p></p>
            <p>Existem três formatos de deck:</p>
            <p>
              <ul style="padding-inline-start: 4vmin;">
                <li><b>Aliança Interplanetária:</b> A fortaleza e os cards do deck devem pertencer somente a uma galáxia.</li><p></p>
                <li><b>Aliança Intergaláctica (padrão):</b> O deck pode conter cards de até duas galáxias, sendo obrigatório que a fortaleza pertença a uma delas.</li><p></p>
                <li><b>Aliança Universal:</b> O deck pode conter cards de qualquer galáxia. No entanto, se incluir cards de três ou mais galáxias, é necessário que a quantidade de cards de cada galáxia seja igual. A fortaleza deve pertencer a uma das galáxias representadas no deck.</li>
              </ul>
            </p>
            <p></p>
            <p><b>Variante Realista:</b> Nesta variante é permitido apenas uma cópia de cada card no deck. Essa regra pode ser aplicada a qualquer modo de jogo ou formato de deck.</p>`
          }
          footer={''}
        />

        <ModalTransparentCarousel isShowModal={isShowCarouselModal} setIsShowModal={setIsShowCarouselModal}
          isShowFooter={true}
          title={carouselModalCard.name} subtitle={carouselModalCard.group} card={carouselModalCard}
          GetCardAmountInDeck={GetCardAmountInDeck} GetMaximumCardAmount={GetMaximumCardAmount}
          backAction={ExecuteCarouselBackAction} forwardAction={ExecuteCarouselForwardAction}
          minusAction={ExecuteCarouselMinusAction} plusAction={ExecuteCarouselPlusAction}
          thumbAction={ExecuteCarouselThumbAction} thumbCard={CarouselThumbCard}
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