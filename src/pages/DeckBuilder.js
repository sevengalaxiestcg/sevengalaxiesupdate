import React, { useEffect, useRef, useState } from 'react';

import ChangeBackground from '../tools/ChangeBackground';
import SetSessionMatch from '../tools/SetSessionMatch';

import Toolbar from '../components/Toolbar';
import { ModalTransparent, ModalOptionsTransparent } from './ModalTransparent';
import { DeckBuilderDecksList, DeckBuilderDecksListHeader } from '../components/DeckBuilderList';
import { DeckBuilderEdit, DeckBuilderEditFooter, DeckBuilderEditHeader } from '../components/DeckBuilderEdit';
import { DeckBuilderCardsList, DeckBuilderCardsListHeader } from '../components/DeckBuilderCardsList';
import { DeckBuilderCardsAdvancedFilter, DeckBuilderCardsAdvancedFilterHeader } from '../components/DeckBuilderCardsAdvancedFilter';

import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { CardType, CostTypes, Galaxies } from '../models/CardsInfos';
import { OrderingDirections, OrderingOptions, basicOrderingOptions } from '../models/OrderingOptions';
import { CardFilterOptions, currentFilterOptions } from '../models/CardFilterOptions';

import thumbPadrao from '../background/SevenG_01.jpg';
import iconCardsList from '../images/menu/cards.png';
import iconDecksList from '../images/menu/decks.png';

import './DeckBuilder.css';
import { cardsThumbs } from '../pseudoDatabases/images';

const downloadPath = "/storage/emulated/0/Download";
const appPath = process.env.PUBLIC_URL;
let CardsLibrary = require('../pseudoDatabases/SevenGalaxies_Cards_Todos.json');

function DeckBuilder() {

  //#region App Globals

  const [refresh, setRefresh] = useState(1);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [session, setSession] = useState({ rodada: undefined, fortaleza: undefined });

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

  function Refresh() {
    setRefresh(atual => atual + 1);
  }

  //#endregion

  //#region Page Globals

  const [isShowDebug, setIsShowDebug] = useState(false);
  const [viewState, setViewState] = useState(DeckBuilderViewStates.CardsList);

  const [AvailableCards, setAvailableCards] = useState(GetAllAvailableCards());
  const [DeckList, setDeckList] = useState(GetDeckListFromSession());
  
  const [showBottomMenu, setShowBottomMenu] = useState(true);
  const [showBodyInnerTopShadow, setShowBodyInnerTopShadow] = useState(true);

  const [orderingOptions, setOrderingOptions] = useState(basicOrderingOptions);
  const [lastOrderingOption, setLastOrderingOption] = useState({ value: OrderingOptions.Code, direction: OrderingDirections.Ascending });
  const [galaxyFilters, setGalaxyFilters] = useState([]);
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [cardEffectsCosts, setCardEffectsCosts] = useState([]);

  const [countNormals, setCountNormals] = useState(0);
  const [countSpecials, setCountSpecials] = useState(0);
  const [countFortress, setCountFortress] = useState(0);

  const [isShowModalDeckInfos, setIsShowModalDeckInfos] = useState(false);
  const [modalTransparentContent, setModalTransparentContent] = useState([]);

  useEffect(() => {
    AvailableCards.map((card) => {
      if (!card.thumb || card.thumb === "") card.thumb = thumbPadrao;
    });
    setAvailableCards(AvailableCards);
    setCardsToShow(AvailableCards);
    SetCounts(AvailableCards, true);
    OrderCardsByOption();
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

    setDeckListToShow(DeckList);
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
    cardEffectsCosts = cardEffectsCosts.sort((a, b) => { return a-b; });
    setCardEffectsCosts(cardEffectsCosts);
  }, [AvailableCards]);

  function SetCounts(cardsList, isSetState) {
    let countNormals = 0;
    let countSpecials = 0;
    let countFortress = 0;
    let countResources = 0;
    let countGaia = 0;
    let countStroj = 0;
    let countMajik = 0;
    let countAdroit = 0;
    let levelCosts = [];
    let effectsCosts = [];
    let cardTypes = [];
    let cardTypesSpecials = [];

    if (!isSetState) {
      cardsList.forEach(card => {
        if (levelCosts.filter(p => p.cost === card.cost).length === 0) {
          levelCosts.push({ cost: card.cost, amount: 0 });
        }

        card.effects.forEach(eff => {
          eff.costs.forEach(effCost => {
            if (effectsCosts.filter(p => p.cost === effCost.costAmount).length === 0) {
              var costAmount = effCost.costAmount;
              if (effCost.costAmount === 99) {
                costAmount = "X";
              }
              effectsCosts.push({ cost: costAmount, amount: 0 });
            }
          });
        });

        if (!IsCardTypeOf('FORTALEZA', card.cardTypes) && !IsCardTypeOf('RECURSO', card.cardTypes)) {
          if (card.specialCard) {
            card.cardTypes.forEach(type => {
              if (cardTypesSpecials.filter(p => p.type === type).length === 0) {
                cardTypesSpecials.push({ type: type, typeName: GetCardTypeName(type), amount: 0 });
              }
            });
          }
          else {
            card.cardTypes.forEach(type => {
              if (cardTypes.filter(p => p.type === type).length === 0) {
                cardTypes.push({ type: type, typeName: GetCardTypeName(type), amount: 0 });
              }
            });
          }
        }
      });

      levelCosts = levelCosts.sort(function (a, b) {
        return a.cost - b.cost;
      });
      effectsCosts = effectsCosts.sort(function (a, b) {
        return a.cost - b.cost;
      });
      cardTypes = cardTypes.sort(function (a, b) {
        let strList = [a.typeName, b.typeName].sort();
        if (strList[0] === a.typeName) { return -1; }
        else { return 1; }
      });
      cardTypesSpecials = cardTypesSpecials.sort(function (a, b) {
        let strList = [a.typeName, b.typeName].sort();
        if (strList[0] === a.typeName) { return -1; }
        else { return 1; }
      });
    }

    cardsList.forEach(card => {
      if (card.specialCard && !IsCardTypeOf('FORTALEZA', card.cardTypes) && !IsCardTypeOf('RECURSO', card.cardTypes)) {
        countSpecials += card.amount ?? 1;
      }
      else if (card.cardTypes.filter(p => p === CardType.Fortress).length > 0) {
        countFortress += card.amount ?? 1;
      }
      else if (card.cardTypes.filter(p => p === CardType.Resource).length > 0) {
        countResources += card.amount ?? 1;
      }
      else {
        countNormals += card.amount ?? 1;
      }

      if (!card.specialCard) {
        if (card.galaxy === Galaxies.Gaia) {
          countGaia += card.amount ?? 1;
        }
        else if (card.galaxy === Galaxies.Stroj) {
          countStroj += card.amount ?? 1;
        }
        else if (card.galaxy === Galaxies.Majik) {
          countMajik += card.amount ?? 1;
        }
        else if (card.galaxy === Galaxies.Adroit) {
          countAdroit += card.amount ?? 1;
        }
      }

      if (!isSetState) {
        if (card.specialCard) {
          card.cardTypes.forEach(type => {
            cardTypesSpecials.forEach(cardType => {
              if (type === cardType.type) {
                cardType.amount += card.amount ?? 1;
              }
            });
          });
        }
        else {
          levelCosts.forEach(levelCost => {
            if (levelCost.cost === card.cost) {
              levelCost.amount += card.amount ?? 1;
            }
          });
  
          card.effects.forEach(eff => {
            eff.costs.forEach(effCost => {
              effectsCosts.forEach(effectCost => {
                if (effectCost.cost === effCost.costAmount || (effectCost.cost === "X" && effCost.costAmount === 99)) {
                  effectCost.amount += card.amount ?? 1;
                }
              });
            });
          });
          
          card.cardTypes.forEach(type => {
            cardTypes.forEach(cardType => {
              if (type === cardType.type) {
                cardType.amount += card.amount ?? 1;
              }
            });
          });
        }
      }
    });

    if (isSetState === true) {
      setCountNormals(countNormals);
      setCountSpecials(countSpecials);
      setCountFortress(countFortress);
    }

    return {
      countNormals: countNormals,
      countSpecials: countSpecials,
      countFortress: countFortress,
      countResources: countResources,
      countGaia: countGaia,
      countStroj: countStroj,
      countMajik: countMajik,
      countAdroit: countAdroit,
      levelCosts:  levelCosts,
      effectsCosts: effectsCosts,
      cardTypes: cardTypes,
      cardTypesSpecials: cardTypesSpecials,
    };
  }

  function GetDeckListFromSession() {
    return JSON.parse(window.localStorage.getItem("sevengalaxies@deckList") ?? "[{}]");
  }

  function SetDeckListInSession(deckList) {
    window.localStorage.setItem("sevengalaxies@deckList", JSON.stringify(deckList));
    setDeckList(deckList);
  }

  function UpdateDeckListInSession () {
    var index = -1;
    for (var i=0; i < DeckList.length; i++) {
      if (DeckList[i].name === currDeck.name) {
        index = i;
      }
    }

    if (index === -1) {
      DeckList.push(currDeck);
    }
    else {
      DeckList[index] = currDeck;
    }
    
    SetDeckListInSession(DeckList);
  }

  function onClickMenuBottomItem (viewState) {
    setViewState(viewState);
    ClearCardsFilters();
    setIsDeckEdit(false);
    setShowBottomMenu(true);

    var elems = document.getElementsByClassName("deckBuilder-body");
    for (var i=0; i < elems.length; i++) {
      var element = elems[i];
      element.scrollTop = 0;
    }
  }

  function onScrollBody(event) {
    let element = event.target;
    let isTop = element.scrollTop <= 1;
    let isBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 3.333;

    setShowBodyInnerTopShadow(isTop);
    setShowBottomMenu(!isDeckEdit && viewState !== DeckBuilderViewStates.DeckEdit && (isTop || !isBottom));
  }

  function ToggleGalaxyFilterSelected(galaxy) {
    if (!galaxyFilters.includes(galaxy)) {
      galaxyFilters.push(galaxy);
    }
    else {
      let index = galaxyFilters.indexOf(galaxy);
      galaxyFilters.splice(index, 1);
    }
    setGalaxyFilters(galaxyFilters);
  }

  function GetGalaxyClass(galaxy) {
    return `deckBuilder-galaxiesContainer-item bt-galaxy ${galaxyFilters.includes(galaxy) ? 'galaxy-selected' : ''}`;
  }

  function GetCategoryClass(category) {
    let cl = 'deckBuilder-cards-categories-item';
    cl = `${cl} ${IsCategoryFilterSelected(category) ? ' category-selected' : ''}`;
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

  //#endregion

  //#region Decks List

  const [DeckListToShow, setDeckListToShow] = useState([]);
  const [isShowEditDeckName, setIsShowEditDeckName] = useState(-1);

  function SearchDeck(term) {
    let filteredList = DeckList;
    if (term) {
      filteredList = filteredList.filter(p => p.name.toUpperCase().includes(term.toUpperCase()));
    }
    if (galaxyFilters.length > 0) {
      filteredList = filteredList.filter(p => p.cards && p.cards.length > 0 && p.cards.filter(q => galaxyFilters.includes(q.galaxy)).length > 0);
    }
    setDeckListToShow(filteredList);
  }

  //#endregion

  //#region Deck Edit

  const [isDeckEdit, setIsDeckEdit] = useState(false);
  const [currDeck, setCurrDeck] = useState();
  const [showMainDeck, setShowMainDeck] = useState(true);
  const [showFortressDeck, setShowFortressDeck] = useState(false);

  function ChangeAmountOfCardInDeck (index, amount) {
    let cards = currDeck.cards;
    if (!cards) {
      return;
    }

    if (!cards[index].amount) cards[index].amount = 0;
    if ((cards[index].amount === 2 && amount > 0) ||
        (cards[index].amount === 1 && amount > 0 && IsCardTypeOf("RECURSO", cards[index].cardTypes)) ||
        (cards[index].amount === 1 && amount > 0 && IsCardTypeOf("FORTALEZA", cards[index].cardTypes))
    ) {
      return;
    }
    cards[index].amount += amount;

    if (cards[index].amount <= 0) {
      cards.splice(index, 1);
    }

    let deck = currDeck;
    deck.cards = cards;
    setCurrDeck(deck);
  }

  //#endregion

  //#region Cards List

  const [cardsToShow, setCardsToShow] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [isShowModalOrderBy, setIsShowModalOrderBy] = useState(false);

  function GetAllAvailableCards () {
    CardsLibrary.cards.forEach(card => {
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
    return CardsLibrary.cards;
  }

  function IsCardTypeOf(term, cardTypes) {
    for (var i = 0; i < cardTypes.length; i++) {
      const cardType = cardTypes[i];
      if (
        ("FORTALEZA".includes(term.toUpperCase()) && cardType === CardType.Fortress) ||
        ("RECURSO".includes(term.toUpperCase()) && cardType === CardType.Resource) ||
        ("CRIATURA".includes(term.toUpperCase()) && cardType === CardType.Creature) ||
        ("EQUIPAMENTO".includes(term.toUpperCase()) && cardType === CardType.Equipment) ||
        ("AÇÃO".includes(term.toUpperCase()) && cardType === CardType.Action) ||
        ("SUPORTE".includes(term.toUpperCase()) && cardType === CardType.Support) ||
        ("ESTRATÉGIA".includes(term.toUpperCase()) && cardType === CardType.Strategy) ||
        ("EVENTO".includes(term.toUpperCase()) && cardType === CardType.Event) ||
        ("LÍDER DE BATALHA".includes(term.toUpperCase()) && cardType === CardType.BattleLeader)
      ) {
        return true;
      }
    }
    return false;
  }

  function GetCardTypeName (cardType) {
    let typeName = "";

    switch (cardType){
      case CardType.Resource:
        typeName = "Recurso";
        break;
      case CardType.Creature:
        typeName = "Criatura";
        break;
      case CardType.Equipment:
        typeName = "Equipamento";
        break;
      case CardType.Action:
        typeName = "Ação";
        break;
      case CardType.Support:
        typeName = "Suporte";
        break;
      case CardType.Strategy:
        typeName = "Estratégia";
        break;
      case CardType.Event:
        typeName = "Evento";
        break;
      case CardType.BattleLeader:
        typeName = "Líder de Batalha";
        break;
      case CardType.Fortress:
        typeName = "Fortaleza";
        break;
      default:
        break;
    }

    return typeName;
  }

  function SearchCard(term) {
    let list = [];
    AvailableCards.forEach(card => {
      list.push({ ...card });
    });
    
    // DEBUG INFORMATIONS
    if (isShowDebug) {
      var cardCosts = [];
      list.forEach(card => {
        if (!cardCosts.includes(card.cost)) {
          cardCosts.push(card.cost);
        }
      });
      
      var cardEffectsCosts = [];
      list.forEach(card => {
        card.effects.forEach(effect => {
          effect.costs.forEach(cost => {
            if (!cardEffectsCosts.includes(cost.costAmount)) {
              cardEffectsCosts.push(cost.costAmount);
            }
          });
        });
      });

      debugger
    }

    // filter by search term
    if (term && term !== "") {
      list = list.filter(p => p.name.toUpperCase().includes(term.toUpperCase()) ||
                              p.description.toUpperCase().includes(term.toUpperCase()) ||
                              (p.effects && p.effects.filter(q => q.description.toUpperCase().includes(term.toUpperCase())).length > 0) ||
                              IsCardTypeOf(term, p.cardTypes)
                        );
    }

    // filter by galaxies
    if (galaxyFilters.length > 0) {
      list = list.filter(p => galaxyFilters.includes(p.galaxy));
    }

    // advanced filters
    if (advancedFilters.length > 0) {
      currentFilterOptions.forEach(filterType => {
        var values = [];
        advancedFilters.forEach(filter => {
          if (filter.filterType === filterType) {
            values.push(filter.value);
          }
        });

        if (values.length > 0) {
          switch (filterType) {
            case CardFilterOptions.BaseCost:
              list = list.filter(p => values.includes(p.cost));
              break;
            case CardFilterOptions.EffectCost:
              list = list.filter(card => card.effects.filter(effect => effect.costs.filter(cost => values.includes(cost.costAmount)).length > 0).length > 0);
              break;
            case CardFilterOptions.CardType:
              list = list.filter(card => card.cardTypes.filter(type => values.includes(type)).length > 0);
              break;
            case CardFilterOptions.Ability:
              list = list.filter(card => card.abilities.filter(ability => values.includes(ability)).length > 0);
              break;
            case CardFilterOptions.EffectTrigger:
              list = list.filter(card => card.effects.filter(effect => values.includes(effect.trigger)).length > 0);
              break;
            case CardFilterOptions.Rarity:
              list = list.filter(p => values.includes(p.rarity));
              break;
            default:
              break;
          }
        }
      });
    }

    // reset counters ALWAYS before applying filters by category, so the counters don't change because of the categories
    SetCounts(list, true);

    // filter by categories
    if (categoryFilters.length > 0) {
      const filterNormals = categoryFilters.filter(p => p === 'normals').length > 0;
      const filterSpecials = categoryFilters.filter(p => p === 'specials').length > 0;
      const filterFortress = categoryFilters.filter(p => p === 'fortress').length > 0;
      list = list.filter(p => (p.specialCard && filterSpecials && !IsCardTypeOf("FORTALEZA", p.cardTypes)) ||
                              (filterFortress && IsCardTypeOf("FORTALEZA", p.cardTypes)) ||
                              (!p.specialCard && filterNormals && !IsCardTypeOf("FORTALEZA", p.cardTypes)));
    }

    // finally, set the cards to be shown
    setCardsToShow(list);
  }

  function ClearCardsFilters () {
    setGalaxyFilters([]);
    setAdvancedFilters([]);
    setCardEffectsCosts([]);
    SearchCard();
  }

  function IsCategoryFilterSelected(category) {
    return categoryFilters.includes(category);
  }

  function ToggleCategoryFilterSelected(category) {
    if (!IsCategoryFilterSelected(category)) {
      categoryFilters.push(category);
    }
    else {
      let index = categoryFilters.indexOf(category);
      categoryFilters.splice(index, 1);
    }
    setCategoryFilters(categoryFilters);
  }

  function OrderCardsByOption (orderingOption) {
    var lastOption = {...lastOrderingOption};
    if (!!orderingOption && !!orderingOption.isOrdering) {
      lastOption.value = orderingOption.value;
    }
    else if (!!orderingOption && !!orderingOption.isDirection) {
      lastOption.direction = orderingOption.value;
    }
    setLastOrderingOption(lastOption);

    if (!!orderingOption) {
      // set the option as the selected one, while others as not selected
      var _orderingOptions = [];
      basicOrderingOptions.forEach(p => _orderingOptions.push({...p}));
      _orderingOptions.map(p => p.isSelected = undefined);
      _orderingOptions.filter(p => p.value === lastOption.value || p.value === lastOption.direction)
                      .map(p => p.isSelected = true);
      setOrderingOptions(_orderingOptions);
    }

    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    var strList = [];
    var cards = AvailableCards.sort(function (a, b) {
      var ret = 0;
      switch (lastOption.value) {
        case OrderingOptions.Key:
          strList = [a.key, b.key].sort(collator.compare);
          if (strList[0] === a.key) { ret = -1; }
          else { ret = 1; }
          break;
        case OrderingOptions.Name:
          strList = [a.name, b.name].sort(collator.compare);
          if (strList[0] === a.name) { ret = -1; }
          else { ret = 1; }
          break;
        case OrderingOptions.BaseCost:
          ret = a.cost - b.cost;
          break;
        case OrderingOptions.Galaxy:
          ret = a.galaxy - b.galaxy;
          break;
        case OrderingOptions.EffectCost:
          var aEffectsCost = 0;
          a.effects.forEach(e => {
            e.costs.forEach(c => {
              aEffectsCost += c.costAmount;
            });
          });
          var bEffectsCost = 0;
          b.effects.forEach(e => {
            e.costs.forEach(c => {
              bEffectsCost += c.costAmount;
            });
          });
          ret = aEffectsCost - bEffectsCost;
          break;
        case OrderingOptions.Rarity:
          ret = a.rarity - b.rarity;
          break;
        case OrderingOptions.IllustratorName:
          strList = [a.illustrator, b.illustrator].sort(collator.compare);
          if (strList[0] === a.illustrator) { ret = -1; }
          else { ret = 1; }
          break;
        case OrderingOptions.Attack:
          ret = a.attack - b.attack;
          break;
        case OrderingOptions.Shield:
          ret = a.shield - b.shield;
          break;
        case OrderingOptions.CounterDamage:
          ret = a.counterDamage - b.counterDamage;
          break;
        case OrderingOptions.DateLaunched:
          strList = [a.dateLaunched, b.dateLaunched].sort(collator.compare);
          if (strList[0] === a.dateLaunched) { ret = -1; }
          else { ret = 1; }
          break;
        case OrderingOptions.Subtype:
          var aSubtypeFirst = a.cardSubtypes.length > 0 ? a.cardSubtypes[0] : "";
          var bSubtypeFirst = b.cardSubtypes.length > 0 ? b.cardSubtypes[0] : "";
          strList = [aSubtypeFirst, bSubtypeFirst].sort(collator.compare);
          if (strList[0] === aSubtypeFirst) { ret = -1; }
          else { ret = 1; }
          break;
        case OrderingOptions.LifePoints:
          ret = a.lifePoints - b.lifePoints;
          break;
        case OrderingOptions.Range:
          ret = a.range - b.range;
          break;
        case OrderingOptions.Code:
        default:
          strList = [a.code, b.code].sort(collator.compare);
          if (strList[0] === a.code) { ret = -1; }
          else { ret = 1; }
          break;
      }

      if (lastOption.direction === OrderingDirections.Descending) {
        ret *= -1;
      }
      return ret;
    });
    setCardsToShow(cards);
  }

  function ToggleFilter (filterType, value) {
    if (!IsFilterSelected(filterType, value)) {
      advancedFilters.push({ "filterType": filterType, "value": value });
    }
    else {
      var index = -1;
      advancedFilters.forEach((filter, i) => {
        if (filter.filterType === filterType && filter.value === value) {
          index = i;
        }
      });
      advancedFilters.splice(index, 1);
    }

    setAdvancedFilters(advancedFilters);
  }

  function IsFilterSelected(filterType, value) {
    return advancedFilters.filter(p => p.filterType === filterType && p.value === value).length > 0;
  }

  function GetFilterClass(filterType, value) {
    return `deckBuilder-filterContainer-item bt-filterOption ${IsFilterSelected(filterType, value) ? 'filter-selected' : ''}`;
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
                ? <DeckBuilderCardsListHeader setViewState={setViewState}
                    SearchCard={SearchCard} 
                    ToggleGalaxyFilterSelected={ToggleGalaxyFilterSelected}
                    ToggleCategoryFilterSelected={ToggleCategoryFilterSelected}
                    GetGalaxyClass={GetGalaxyClass}
                    GetCategoryClass={GetCategoryClass}
                    countNormals={countNormals}
                    countSpecials={countSpecials}
                    countFortress={countFortress}
                    setIsShowModalOrderBy={setIsShowModalOrderBy}
                    isDeckEdit={isDeckEdit}
                  />
                : <></>
              }
              {viewState === DeckBuilderViewStates.AdvancedSearchCard
                ? <DeckBuilderCardsAdvancedFilterHeader setViewState={setViewState}
                    SearchCard={SearchCard} 
                    ToggleGalaxyFilterSelected={ToggleGalaxyFilterSelected}
                    ToggleCategoryFilterSelected={ToggleCategoryFilterSelected}
                    GetGalaxyClass={GetGalaxyClass}
                    GetCategoryClass={GetCategoryClass}
                    countNormals={countNormals}
                    countSpecials={countSpecials}
                    countFortress={countFortress}
                    setShowBottomMenu={setShowBottomMenu}
                    isDeckEdit={isDeckEdit}
                  />
                : <></>
              }
              {viewState === DeckBuilderViewStates.DecksList
                ? <DeckBuilderDecksListHeader
                    SearchDeck={SearchDeck}
                    setCurrDeck={setCurrDeck}
                    setViewState={setViewState}
                    ToggleGalaxyFilterSelected={ToggleGalaxyFilterSelected}
                    GetGalaxyClass={GetGalaxyClass}
                    setShowBottomMenu={setShowBottomMenu}
                    DeckList={DeckList} SetDeckListInSession={SetDeckListInSession}
                    thumbPadrao={thumbPadrao}
                    setShowMainDeck={setShowMainDeck}
                    setShowFortressDeck={setShowFortressDeck}
                  />
                : <></>
              }
              {viewState === DeckBuilderViewStates.DeckEdit
                ? <DeckBuilderEditHeader setViewState={setViewState}
                    currDeck={currDeck} setCurrDeck={setCurrDeck}
                    SearchCard={SearchCard}
                    setIsDeckEdit={setIsDeckEdit}
                    setShowBottomMenu={setShowBottomMenu}
                    ClearCardsFilters={ClearCardsFilters}
                    setIsShowModal={setIsShowModalDeckInfos}
                    setModalContent={setModalTransparentContent}
                    SetCounts={SetCounts}
                  />
                : <></>
              }
            </div>

            {/* BODY */}
            <div onScroll={onScrollBody}
              className={'deckBuilder-body' + (showBodyInnerTopShadow ? '' : ' has-shadow') + (viewState === DeckBuilderViewStates.DeckEdit ? ' deckList-body' : '')}>
              {viewState === DeckBuilderViewStates.CardsList
                ? <DeckBuilderCardsList setViewState={setViewState}
                    cardsList={cardsToShow}
                    currDeck={currDeck}
                    isDeckEdit={isDeckEdit}
                    ChangeAmountOfCardInDeck={ChangeAmountOfCardInDeck}
                    UpdateDeckListInSession={UpdateDeckListInSession}
                    IsCardTypeOf={IsCardTypeOf}
                  />
                : <></>
              }
              {viewState === DeckBuilderViewStates.AdvancedSearchCard
                ? <DeckBuilderCardsAdvancedFilter
                    SearchCard={SearchCard}
                    GetFilterClass={GetFilterClass}
                    ToggleFilter={ToggleFilter}
                    cardEffectsCosts={cardEffectsCosts}
                  />
                : <></>
              }
              {viewState === DeckBuilderViewStates.DecksList
                ? <DeckBuilderDecksList
                    DeckList={DeckListToShow}
                    SetDeckListInSession={SetDeckListInSession}
                    isShowEditDeckName={isShowEditDeckName} setIsShowEditDeckName={setIsShowEditDeckName}
                    setCurrDeck={setCurrDeck}
                    setViewState={setViewState}
                    setShowBottomMenu={setShowBottomMenu}
                    IsCardTypeOf={IsCardTypeOf}
                    setShowMainDeck={setShowMainDeck}
                    setShowFortressDeck={setShowFortressDeck}
                  />
                : <></>
              }
              {viewState === DeckBuilderViewStates.DeckEdit
                ? <DeckBuilderEdit setViewState={setViewState}
                    cardsList={cardsToShow}
                    currDeck={currDeck} setCurrDeck={setCurrDeck}
                    ChangeAmountOfCardInDeck={ChangeAmountOfCardInDeck}
                    UpdateDeckListInSession={UpdateDeckListInSession}
                    IsCardTypeOf={IsCardTypeOf}
                    showMainDeck={showMainDeck} setShowMainDeck={setShowMainDeck}
                    showFortressDeck={showFortressDeck} setShowFortressDeck={setShowFortressDeck}
                  />
                : <></>
              }
            </div>

            {/* FOOTER */}
            {showBottomMenu
              ? <>
                  <div className='deckBuilder-footer'>
                    <div className='deckBuilder-footer-item' onClick={() => onClickMenuBottomItem(DeckBuilderViewStates.CardsList)}>
                      <div className='deckBuilder-footer-itemBox'>
                        <img alt="Cards" className={viewState === DeckBuilderViewStates.CardsList ? 'image-selected' : ''} src={iconCardsList}></img>
                        <span className={viewState === DeckBuilderViewStates.CardsList ? 'text-selected' : ''}>Cards</span>
                      </div>
                    </div>
                    <div className='deckBuilder-footer-item' onClick={() => onClickMenuBottomItem(DeckBuilderViewStates.DecksList)}>
                      <div className='deckBuilder-footer-itemBox'>
                        <img alt="Decks" className={viewState === DeckBuilderViewStates.DecksList ? 'image-selected' : ''} src={iconDecksList}></img>
                        <span className={viewState === DeckBuilderViewStates.DecksList ? 'text-selected' : ''}>Decks</span>
                      </div>
                    </div>
                  </div>
                </>
              : <></>
            }

          </div>
        </div>

        <ModalOptionsTransparent modalTitle="CLASSIFICAR POR:"
          onOptionSelected={OrderCardsByOption} options={orderingOptions}
          isShowModal={isShowModalOrderBy} setIsShowModal={setIsShowModalOrderBy}
        />

        <ModalTransparent modalTitle={`${currDeck?.name??""}`}
          content={modalTransparentContent}
          isShowModal={isShowModalDeckInfos} setIsShowModal={setIsShowModalDeckInfos}
        />
      </main>

      {/* <div className="corporation"> © {anoAtual} 7G Universe</div> */}
    </>
  );
}

export default DeckBuilder;