import thumbPadrao from '../background/SevenG_01.jpg';
import { CardType, Galaxies } from '../models/CardsInfos';
import { cardsThumbs } from '../pseudoDatabases/images';
import { CardFilterOptions, currentFilterOptions } from '../models/CardFilterOptions';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { basicOrderingCardsOptions, basicOrderingDecksOptions, GalaxiesOrderings, OrderingDirections, OrderingOptions, OrderingPriorities } from '../models/OrderingOptions';
let CardsLibrary = require('../pseudoDatabases/SevenGalaxies_Cards_Todos.json');

export class DecksCardsComponentBase {

  constructor(setCountNormals, setCountSpecials, setCountFortress, DeckList, setDeckList, currDeck, setViewState, setIsDeckEdit, setShowBottomMenu,
    setShowBodyInnerTopShadow, isDeckEdit, viewState, setRefresh, galaxyFilters, setGalaxyFilters, orderingDecksOptions, orderingCardsOptions, setDecksSearchTerm,
    setDeckListToShow, lastOrderingDecksOption, setLastOrderingDecksOption, setOrderingDecksOptions, setCurrDeck, AvailableCards, setAvailableCards, advancedFilters, categoryFilters,
    setAdvancedFilters, setCategoryFilters, cardsToShow, setCardsToShow, lastOrderingCardsOption, setLastOrderingCardsOption, DecksSearchTerm, DeckListToShow, 
    setOrderingCardsOptions, setModalTransparentContent, setIsShowModalDeckInfos, deckErrorMessages, setDeckErrorMessages) {
      this.setCountNormals = setCountNormals;
      this.setCountSpecials = setCountSpecials;
      this.setCountFortress = setCountFortress;
      this.DeckList = DeckList;
      this.setDeckList = setDeckList;
      this.currDeck = currDeck;
      this.setViewState = setViewState;
      this.setIsDeckEdit = setIsDeckEdit;
      this.setShowBottomMenu = setShowBottomMenu;
      this.setShowBodyInnerTopShadow = setShowBodyInnerTopShadow;
      this.isDeckEdit = isDeckEdit;
      this.viewState = viewState;
      this.setRefresh = setRefresh;
      this.galaxyFilters = galaxyFilters;
      this.setGalaxyFilters = setGalaxyFilters;
      this.orderingDecksOptions = orderingDecksOptions;
      this.orderingCardsOptions = orderingCardsOptions;
      this.setDecksSearchTerm = setDecksSearchTerm;
      this.setDeckListToShow = setDeckListToShow;
      this.lastOrderingDecksOption = lastOrderingDecksOption;
      this.setLastOrderingDecksOption = setLastOrderingDecksOption;
      this.setOrderingDecksOptions = setOrderingDecksOptions;
      this.setCurrDeck = setCurrDeck;
      this.AvailableCards = AvailableCards;
      this.setAvailableCards = setAvailableCards;
      this.advancedFilters = advancedFilters;
      this.categoryFilters = categoryFilters;
      this.setAdvancedFilters = setAdvancedFilters;
      this.setCategoryFilters = setCategoryFilters;
      this.cardsToShow = cardsToShow;
      this.setCardsToShow = setCardsToShow;
      this.lastOrderingCardsOption = lastOrderingCardsOption;
      this.setLastOrderingCardsOption = setLastOrderingCardsOption;
      this.DecksSearchTerm = DecksSearchTerm;
      this.DeckListToShow = DeckListToShow; 
      this.setOrderingCardsOptions = setOrderingCardsOptions;
      this.setModalTransparentContent = setModalTransparentContent;
      this.setIsShowModalDeckInfos = setIsShowModalDeckInfos;
      this.deckErrorMessages = deckErrorMessages;
      this.setDeckErrorMessages = setDeckErrorMessages;
  }

  //#region Globals

  Refresh() {
    this.setRefresh(atual => atual + 1);
  }

  GetAllAvailableCards () {
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

  GetDeckListFromSession() {
    return JSON.parse(window.localStorage.getItem("sevengalaxies@deckList") ?? "[{}]");
  }

  SetCounts(cardsList, isSetState) {
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

        if (!this.IsCardTypeOf('FORTALEZA', card.cardTypes) && !this.IsCardTypeOf('RECURSO', card.cardTypes)) {
          if (card.specialCard) {
            card.cardTypes.forEach(type => {
              if (cardTypesSpecials.filter(p => p.type === type).length === 0) {
                cardTypesSpecials.push({ type: type, typeName: this.GetCardTypeName(type), amount: 0 });
              }
            });
          }
          else {
            card.cardTypes.forEach(type => {
              if (cardTypes.filter(p => p.type === type).length === 0) {
                cardTypes.push({ type: type, typeName: this.GetCardTypeName(type), amount: 0 });
              }
            });
          }
        }
      });

      levelCosts = levelCosts.sort((a, b) => {
        return a.cost - b.cost;
      });
      effectsCosts = effectsCosts.sort((a, b) => {
        return a.cost - b.cost;
      });
      cardTypes = cardTypes.sort((a, b) => {
        let strList = [a.typeName, b.typeName].sort();
        if (strList[0] === a.typeName) { return -1; }
        else { return 1; }
      });
      cardTypesSpecials = cardTypesSpecials.sort((a, b) => {
        let strList = [a.typeName, b.typeName].sort();
        if (strList[0] === a.typeName) { return -1; }
        else { return 1; }
      });
    }

    cardsList.forEach(card => {
      if (card.specialCard && !this.IsCardTypeOf('FORTALEZA', card.cardTypes) && !this.IsCardTypeOf('RECURSO', card.cardTypes)) {
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
    countSpecials += countResources;

    if (isSetState === true) {
      this.setCountNormals(countNormals);
      this.setCountSpecials(countSpecials);
      this.setCountFortress(countFortress);
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

  SetDeckListInSession(deckList) {
    window.localStorage.setItem("sevengalaxies@deckList", JSON.stringify(deckList));
    this.setDeckList(deckList);
  }

  UpdateDeckListInSession () {
    var index = -1;
    for (var i=0; i < this.DeckList.length; i++) {
      if (this.DeckList[i].name === this.currDeck.name) {
        index = i;
      }
    }

    if (index === -1) {
      this.DeckList.push(this.currDeck);
    }
    else {
      this.DeckList[index] = this.currDeck;
    }
    
    this.SetDeckListInSession(this.DeckList);
  }

  onClickMenuBottomItem (viewState) {
    this.setViewState(viewState);
    this.ClearCardsFilters();
    this.setIsDeckEdit(false);
    this.setShowBottomMenu(true);

    var elems = document.getElementsByClassName("deckBuilder-body");
    for (var i=0; i < elems.length; i++) {
      var element = elems[i];
      element.scrollTop = 0;
    }
  }

  onScrollBody(event) {
    let element = event.target;
    let isTop = element.scrollTop <= 1;
    let isBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 3.333;

    this.setShowBodyInnerTopShadow(isTop);
    this.setShowBottomMenu(this.viewState !== DeckBuilderViewStates.DeckEdit && (isTop || !isBottom));
  }

  ToggleGalaxyFilterSelected(galaxy) {
    if (!this.galaxyFilters.includes(galaxy)) {
      this.galaxyFilters.push(galaxy);
    }
    else {
      let index = this.galaxyFilters.indexOf(galaxy);
      this.galaxyFilters.splice(index, 1);
    }
    this.setGalaxyFilters(this.galaxyFilters);
  }

  GetGalaxyClass(galaxy) {
    return `deckBuilder-galaxiesContainer-item bt-galaxy ${this.galaxyFilters.includes(galaxy) ? 'galaxy-selected' : ''}`;
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

  OrderByOption (orderingOption) {
    if (this.viewState === DeckBuilderViewStates.DecksList) {
      this.OrderDecksByOption (orderingOption);
    }
    else if (this.viewState === DeckBuilderViewStates.CardsList) {
      this.OrderCardsByOption(orderingOption);
    }
  }

  GetOrderingOptions () {
    if (this.viewState === DeckBuilderViewStates.DecksList) {
      return this.orderingDecksOptions;
    }
    else if (this.viewState === DeckBuilderViewStates.CardsList) {
      return this.orderingCardsOptions;
    }
    return [];
  }

  GetCurrDeckCountNormals () {
    const normalCards = this.currDeck.cards.filter(p => !p.specialCard);
    let count = 0;
    normalCards.map(p => count += p.amount)
    return count;
  }

  GetCardAmountInDeck (card) {
    if (!this.currDeck) return 0;
    const cardsFiltered = this.currDeck.cards.filter(p => p.code === card.code);
    if (cardsFiltered && cardsFiltered.length) return cardsFiltered[0].amount;
    return 0;
  }

  GetMaximumCardAmount(card) {
    if (card.specialCard === true && !this.IsCardTypeOf('RECURSO', card.cardTypes) && !this.IsCardTypeOf('FORTALEZA', card.cardTypes)) {
      return 8;
    }
    else if (this.IsCardTypeOf('RECURSO', card.cardTypes) || this.IsCardTypeOf('FORTALEZA', card.cardTypes)) {
      return 1;
    }
    return 2;
  }

  IndexOfCardInDeck (card) {
    if (!this.currDeck.cards) this.currDeck.cards = [];

    for (var i=0; i < this.currDeck.cards.length; i++) {
      if (card.code === this.currDeck.cards[i].code) {
        return i;
      }
    }
    return -1;
  }

  //#endregion

  //#region Decks List

  SearchDeck(term) {
    this.setDecksSearchTerm(term);

    let filteredList = this.DeckList;
    if (term) {
      filteredList = filteredList.filter(p => p.name.toUpperCase().includes(term.toUpperCase()));
    }
    if (this.galaxyFilters.length > 0) {
      filteredList = filteredList.filter(p => p.cards && p.cards.length > 0 && p.cards.filter(q => this.galaxyFilters.includes(q.galaxy)).length > 0);
    }
    this.setDeckListToShow(filteredList);
  }

  GetGalaxyOrdering (galaxy) {
    switch (galaxy) {
      case Galaxies.Gaia:
        return GalaxiesOrderings.Gaia;
      case Galaxies.Stroj:
        return GalaxiesOrderings.Stroj;
      case Galaxies.Majik:
        return GalaxiesOrderings.Majik;
      case Galaxies.Adroit:
        return GalaxiesOrderings.Adroit;
      default:
        return 999;
    }
  }

  OrderDecksByOption (orderingOption) {
    var lastOption = {...this.lastOrderingDecksOption};
    if (!!orderingOption && !!orderingOption.isOrdering) {
      lastOption.value = orderingOption.value;
    }
    else if (!!orderingOption && !!orderingOption.isDirection) {
      lastOption.direction = orderingOption.value;
    }
    this.setLastOrderingDecksOption(lastOption);

    if (!!orderingOption) {
      // set the option as the selected one, while others as not selected
      var _orderingOptions = [];
      basicOrderingDecksOptions.forEach(p => _orderingOptions.push({...p}));
      _orderingOptions.map(p => p.isSelected = undefined);
      _orderingOptions.filter(p => p.value === lastOption.value || p.value === lastOption.direction)
                      .map(p => p.isSelected = true);
                      this.setOrderingDecksOptions(_orderingOptions);
    }

    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    var strList = [];
    var decks = this.DeckList.sort((a, b) => {
      var ret = 0;
      switch (lastOption.value) {
        case OrderingOptions.Name:
          strList = [a.name, b.name].sort(collator.compare);
          if (strList[0] === a.name) { ret = -1; }
          else { ret = 1; }
          break;
        case OrderingOptions.DateCreated:
          if (a.creationDate < b.creationDate) { ret = -1; } 
          else { ret = 1; }
          break;
        case OrderingOptions.Galaxy:
          const fortressAFilter = a.cards.filter(p => this.IsCardTypeOf("FORTALEZA", p.cardTypes));
          let fortressA = undefined;
          if (fortressAFilter.length) fortressA = fortressAFilter[0];
          let fortressAOrdering = this.GetGalaxyOrdering();
          if (fortressA) fortressAOrdering = this.GetGalaxyOrdering(fortressA.galaxy);

          const fortressBFilter = b.cards.filter(p => this.IsCardTypeOf("FORTALEZA", p.cardTypes));
          let fortressB = undefined;
          if (fortressBFilter.length) fortressB = fortressBFilter[0];
          let fortressBOrdering = this.GetGalaxyOrdering();
          if (fortressB) fortressBOrdering = this.GetGalaxyOrdering(fortressB.galaxy);

          if (fortressAOrdering < fortressBOrdering) { ret = -1; }
          else { ret = 1; }
          break;
        default:
          strList = [a.name, b.name].sort(collator.compare);
          if (strList[0] === a.name) { ret = -1; }
          else { ret = 1; }
          break;
      }

      if (lastOption.direction === OrderingDirections.Descending) {
        ret *= -1;
      }
      return ret;
    });
    this.setDeckListToShow(decks);
  }

  //#endregion

  //#region Deck Edit

  ChangeAmountOfCardInDeck (index, amount) {
    let cards = this.currDeck.cards;
    if (!cards) {
      return;
    }

    if (!cards[index].amount) cards[index].amount = 0;
    if ((cards[index].amount === 2 && amount > 0 && !cards[index].specialCard) ||
        (cards[index].amount === 1 && amount > 0 && this.IsCardTypeOf("RECURSO", cards[index].cardTypes)) ||
        (cards[index].amount === 1 && amount > 0 && this.IsCardTypeOf("FORTALEZA", cards[index].cardTypes)) ||
        (cards[index].amount === 8 && amount > 0 && cards[index].specialCard)
    ) {
      return;
    }
    cards[index].amount += amount;

    if (cards[index].amount <= 0) {
      cards.splice(index, 1);
    }

    let deck = this.currDeck;
    deck.cards = cards;
    this.setCurrDeck(deck);

    const errorMessages = this.TestDeck(deck);
    this.setDeckErrorMessages(errorMessages);
  }

  ShowDeckInformations () {
    var content = '<ul>';
    const counters = this.SetCounts(this.currDeck.cards??[]);

    content += "<br/><li>TOTAL DE CARDS</li>";
    content += `<li><strong>Deck:</strong><span style='margin-left: 1em;'>${counters.countNormals}/40</span></li>`;
    content += `<li><strong>Deck Especial:</strong><span style='margin-left: 1em;'>${counters.countSpecials}/100</span></li>`;
    content += `<li><strong>Fortaleza:</strong><span style='margin-left: 1em;'>${counters.countFortress}/1</span></li>`;

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>GALÁXIAS</li>";
    if (counters.countGaia > 0) {
      content += `<li><strong>Gaia:</strong><span style='margin-left: 1em;'>${counters.countGaia}</span></li>`;
    }
    if (counters.countStroj > 0) {
      content += `<li><strong>Stroj:</strong><span style='margin-left: 1em;'>${counters.countStroj}</span></li>`;
    }
    if (counters.countMajik > 0) {
      content += `<li><strong>Majik:</strong><span style='margin-left: 1em;'>${counters.countMajik}</span></li>`;
    }
    if (counters.countAdroit > 0) {
      content += `<li><strong>Adroit:</strong><span style='margin-left: 1em;'>${counters.countAdroit}</span></li>`;
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>NÍVEL DO DECK</li>";
    if (counters.levelCosts.length > 0) {
      counters.levelCosts.forEach(levelCost => {
        if (levelCost.amount > 0) {
          content += `<li><strong>N${levelCost.cost}:</strong><span style='margin-left: 1em;'>${levelCost.amount}</span></li>`;
        }
      });
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>ENERGIA DO DECK</li>";
    if (counters.effectsCosts.length > 0) {
      counters.effectsCosts.forEach(effectCost => {
        content += `<li><strong>E${effectCost.cost}:</strong><span style='margin-left: 1em;'>${effectCost.amount}</span></li>`;
      });
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>CARDS DECK</li>";
    if (counters.cardTypes.length > 0) {
      counters.cardTypes.forEach(cardType => {
        if (cardType.amount > 0) {
          content += `<li><strong>${cardType.typeName}:</strong><span style='margin-left: 1em;'>${cardType.amount}</span></li>`;
        }
      });
    }

    content += "<li style='margin-top: 1em;'></li>";
    content += "<li>CARDS DECK ESPECIAL</li>";
    if (counters.cardTypesSpecials.length > 0) {
      counters.cardTypesSpecials.forEach(cardType => {
        if (cardType.amount > 0) {
          content += `<li><strong>${cardType.typeName}:</strong><span style='margin-left: 1em;'>${cardType.amount}</span></li>`;
        }
      });
    }
    content += `<li><strong>Recurso:</strong><span style='margin-left: 1em;'>${counters.countResources}/1</span></li>`;

    if (this.deckErrorMessages && this.deckErrorMessages.length) {
      content += `<br/><li class='text-danger'><strong>Erros:</strong></li>`;
      for (let i = 0; i < this.deckErrorMessages.length; i++) {
        const message = this.deckErrorMessages[i];
        content += `<li class='text-danger'><span>${message}</span></li>`;
      }
    }

    content += "</ul>";
    this.setModalTransparentContent(content);
    this.setIsShowModalDeckInfos(true);
  }

  TestDeck (deck) {
    const mainDeckCards = deck.cards.filter(p => !p.specialCard);
    let mainDeckCardsAmount = 0;
    mainDeckCards.forEach((card, i) => { mainDeckCardsAmount += card.amount });
    const hasLessThanMinimumCards = mainDeckCardsAmount < 30;
    const hasMoreThanMaximumCards = mainDeckCardsAmount > 40;

    const fortressesCards = deck.cards.filter(p => this.IsCardTypeOf('FORTALEZA', p.cardTypes));
    const fortressesAmount = fortressesCards.length;
    const hasMoreThanMaximumFortresses = fortressesAmount > 1;
    const doesNotHaveFortress = fortressesAmount === 0;

    const resourcesAmount = deck.cards.filter(p => this.IsCardTypeOf('RECURSO', p.cardTypes)).length;
    const hasMoreThanMaximumResources = resourcesAmount > 1;
    const doesNotHaveResource = resourcesAmount === 0;

    const eventCards = deck.cards.filter(p => this.IsCardTypeOf('EVENTO', p.cardTypes));
    let hasEventWithGalaxyOtherThanFortresses = false;
    if (!doesNotHaveFortress) {
      let eventGalaxies = [];
      eventCards.forEach(card => { eventGalaxies.push(card.galaxy); });
      let fortressesGalaxies = [];
      fortressesCards.forEach(card => { fortressesGalaxies.push(card.galaxy); });

      hasEventWithGalaxyOtherThanFortresses = !!(eventGalaxies.filter(p => !fortressesGalaxies.includes(p)).length);
    }

    let has3OrMoreGalaxiesWithDiffAmounts = false;
    let hasFortressNotOfGalaxiesInDeck = false;
    let deckGalaxies = [];
    if (!doesNotHaveFortress) {
      let deckGalaxiesAmounts = [];
      for (var i = 0; i < mainDeckCards.length; i++) {
        const card = mainDeckCards[i];
        const arrGalaxy = deckGalaxiesAmounts.filter(p => p.galaxy === card.galaxy);
        if (arrGalaxy.length) {
          const galaxy = arrGalaxy[0];
          galaxy.amount += card.amount;
        }
        else {
          deckGalaxiesAmounts.push({ galaxy: card.galaxy, amount: card.amount });
        }
      }

      deckGalaxiesAmounts.forEach(p => { deckGalaxies.push(p.galaxy); });
      let fortressesGalaxies = [];
      fortressesCards.forEach(card => { fortressesGalaxies.push(card.galaxy); });

      hasFortressNotOfGalaxiesInDeck = !!(fortressesGalaxies.filter(p => !deckGalaxies.includes(p)).length);

      for (var k = 0; k < deckGalaxiesAmounts.length - 1; k++) {
        if (has3OrMoreGalaxiesWithDiffAmounts) break;
        has3OrMoreGalaxiesWithDiffAmounts = deckGalaxiesAmounts[k].amount !== deckGalaxiesAmounts[k + 1].amount;
      }
    }

    let messages = [];

    if (hasLessThanMinimumCards) {
      messages.push("O deck Principal não possui o mínimo de 30 cards.");
    }
    if (hasMoreThanMaximumCards) {
      messages.push("O deck Principal possui mais que o máximo de 40 cards.");
    }
    if (hasMoreThanMaximumFortresses) {
      messages.push("O deck possui mais do que uma Fortaleza.");
    }
    if (doesNotHaveFortress) {
      messages.push("O deck não possui uma Fortaleza.");
    }
    if (hasMoreThanMaximumResources) {
      messages.push("O deck possui mais do que um card de Recurso.");
    }
    if (doesNotHaveResource) {
      messages.push("O deck não possui um card de Recurso.");
    }
    if (hasEventWithGalaxyOtherThanFortresses) {
      messages.push("O deck deve conter apenas Eventos da mesma Galáxia de sua Fortaleza.");
    }
    if (deckGalaxies.length > 2 &&
      (has3OrMoreGalaxiesWithDiffAmounts || hasFortressNotOfGalaxiesInDeck)
    ) {
      messages.push("Aliança Universal: para jogar com 3 ou mais Galáxias é preciso ter a mesma quantidade de cards de cada Galáxia, e a Fortaleza deve pertencer a uma delas.");
    }
    else if (deckGalaxies.length > 1 && hasFortressNotOfGalaxiesInDeck)
    {
      messages.push("A Fortaleza deve ser de uma das Galáxias no deck.");
    }
    else if (hasFortressNotOfGalaxiesInDeck)
    {
      messages.push("A Fortaleza deve ser da mesma Galáxia do deck.");
    }
    
    return messages;
}

  //#endregion

  //#region Cards List

  IsCardTypeOf(term, cardTypes) {
    if (!cardTypes || !cardTypes.length) return false;

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

  GetCardTypeName (cardType) {
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

  IsCardSubtypeIncludedInList (cardSubtypes, subtypesList) {
    return cardSubtypes.filter(p => subtypesList.includes(p)).length;
  }

  SearchCard(term) {
    let list = [];
    this.AvailableCards.forEach(card => {
      list.push({ ...card });
    });
    
    // filter by search term
    if (term && term !== "") {
      list = list.filter(p => p.name.toUpperCase().includes(term.toUpperCase()) ||
                              p.description.toUpperCase().includes(term.toUpperCase()) ||
                              (p.effects && p.effects.filter(q => q.description.toUpperCase().includes(term.toUpperCase())).length > 0) ||
                              this.IsCardTypeOf(term, p.cardTypes)
                        );
    }

    // filter by galaxies
    if (this.galaxyFilters.length > 0) {
      list = list.filter(p => this.galaxyFilters.includes(p.galaxy));
    }

    // advanced filters
    if (this.advancedFilters.length > 0) {
      currentFilterOptions.forEach(filterType => {
        var values = [];
        this.advancedFilters.forEach(filter => {
          if (filter.filterType === filterType) {
            values.push(filter.value);
          }
        });
        
        if (values.length) {
          switch (filterType) {
            case CardFilterOptions.BaseCost:
              list = list.filter(p => values.includes(p.cost) && !this.IsCardTypeOf("FORTALEZA", p.cardTypes) && !this.IsCardTypeOf("RECURSO", p.cardTypes));
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
            case CardFilterOptions.Range:
              list = list.filter(p => values.includes(p.range));
              break;
            case CardFilterOptions.Subtype:
              list = list.filter(p => ((this.IsCardTypeOf('CRIATURA', p.cardTypes) || this.IsCardTypeOf('SUPORTE', p.cardTypes)) 
                                       && this.IsCardSubtypeIncludedInList(p.cardSubtypes, values)));
              break;
            default:
              break;
          }
        }
      });
    }

    // reset counters ALWAYS before applying filters by category, so the counters don't change because of the categories
    this.SetCounts(list, true);

    // filter by categories
    if (this.categoryFilters.length) {
      const filterNormals = this.categoryFilters.filter(p => p === 'normals').length;
      const filterSpecials = this.categoryFilters.filter(p => p === 'specials').length;
      const filterFortress = this.categoryFilters.filter(p => p === 'fortress').length;
      list = list.filter(p => (p.specialCard && filterSpecials && !this.IsCardTypeOf("FORTALEZA", p.cardTypes)) ||
                              (filterFortress && this.IsCardTypeOf("FORTALEZA", p.cardTypes)) ||
                              (!p.specialCard && filterNormals && !this.IsCardTypeOf("FORTALEZA", p.cardTypes)));
    }

    // finally, set the cards to be shown
    this.setCardsToShow(list);
  }

  ClearCardsFilters () {
    let filters = this.categoryFilters;
    while (filters.length) filters.splice(0, 1);
    this.setCategoryFilters(filters);

    filters = this.advancedFilters;
    while (filters.length) filters.splice(0, 1);
    this.setAdvancedFilters(filters);

    filters = this.galaxyFilters;
    while (filters.length) filters.splice(0, 1);
    this.setGalaxyFilters(filters);
    
    this.SearchCard();
  }

  HasFilterApplied (viewState) {
    if (viewState === DeckBuilderViewStates.DecksList) {
      return this.DecksSearchTerm !== undefined || this.DeckListToShow.length < this.DeckList.length || this.galaxyFilters.length > 0;
    }
    return this.cardsToShow.length < this.AvailableCards.length;
  }

  IsCategoryFilterSelected(category) {
    return this.categoryFilters.includes(category);
  }

  ToggleCategoryFilterSelected(category) {
    if (!this.IsCategoryFilterSelected(category)) {
      for (let i = 0; i < this.categoryFilters.length; i++) {
        const item = this.categoryFilters[i];
        this.UnselectCategoryFilter(item);
      }
      this.SelectCategoryFilter(category);
    }
    else {
      this.UnselectCategoryFilter(category);
    }
    this.setCategoryFilters(this.categoryFilters);
  }

  SelectCategoryFilter (category) {
    if (!this.IsCategoryFilterSelected(category)) {
      this.categoryFilters.push(category);
    }
  }

  UnselectCategoryFilter (category) {
    if (!this.IsCategoryFilterSelected(category)) return;
    let index = this.categoryFilters.indexOf(category);
    this.categoryFilters.splice(index, 1);
  }

  OrderCards (a, b, option) {
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    var strList = [];

    var ret = 0;
    switch (option.value) {
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

    if (option.direction === OrderingDirections.Descending) {
      ret *= -1;
    }

    return ret;
  }

  OrderCardsByOption (orderingOption) {
    let lastOption = {...this.lastOrderingCardsOption};
    if (!!orderingOption && !!orderingOption.isOrdering) {
      lastOption.value = orderingOption.value;
    }
    else if (!!orderingOption && !!orderingOption.isDirection) {
      lastOption.direction = orderingOption.value;
    }
    this.setLastOrderingCardsOption(lastOption);

    if (!!orderingOption) {
      // set the option as the selected one, while others as not selected
      let _orderingOptions = [];
      basicOrderingCardsOptions.forEach(p => _orderingOptions.push({...p}));
      _orderingOptions.map(p => p.isSelected = undefined);
      _orderingOptions.filter(p => p.value === lastOption.value || p.value === lastOption.direction)
                      .map(p => p.isSelected = true);
                      this.setOrderingCardsOptions(_orderingOptions);
    }

    let cards = this.cardsToShow.sort((a, b) => {
      return this.OrderCards(a, b, lastOption);
    });
    this.setCardsToShow(cards);

    let availableCards = this.AvailableCards.sort((a, b) => {
      return this.OrderCards(a, b, lastOption);
    });
    this.setAvailableCards(availableCards);
  }

  OrderCardsList (cardsList) {
    const orderedCards = cardsList.sort((a, b) => {
      if (a.cost !== b.cost) {
        return this.OrderCards(a, b, { value: OrderingOptions.BaseCost, direction: OrderingDirections.Ascending });
      }
      else {
        let aTypeIndex = -1;
        let bTypeIndex = -1;

        //#region retrieve types

        const aIsCreature = this.IsCardTypeOf("CRIATURA", a.cardTypes);
        const aIsEquipent = this.IsCardTypeOf("EQUIPAMENTO", a.cardTypes);
        const aIsSupport = this.IsCardTypeOf("SUPORTE", a.cardTypes);
        const aIsStrategy = this.IsCardTypeOf("ESTRATÉGIA", a.cardTypes);
        const aIsAction = this.IsCardTypeOf("AÇÃO", a.cardTypes);
        const aIsEvent = this.IsCardTypeOf("EVENTO", a.cardTypes);
        if (aIsCreature) {
          aTypeIndex = OrderingPriorities.Creature;
        }
        else if (aIsEquipent) {
          aTypeIndex = OrderingPriorities.Equipment;
        }
        else if (aIsSupport) {
          aTypeIndex = OrderingPriorities.Support;
        }
        else if (aIsStrategy) {
          aTypeIndex = OrderingPriorities.Strategy;
        }
        else if (aIsAction) {
          aTypeIndex = OrderingPriorities.Action;
        }
        else if (aIsEvent) {
          aTypeIndex = OrderingPriorities.Event;
        }
        
        const bIsCreature = this.IsCardTypeOf("CRIATURA", b.cardTypes);
        const bIsEquipent = this.IsCardTypeOf("EQUIPAMENTO", b.cardTypes);
        const bIsSupport = this.IsCardTypeOf("SUPORTE", b.cardTypes);
        const bIsStrategy = this.IsCardTypeOf("ESTRATÉGIA", b.cardTypes);
        const bIsAction = this.IsCardTypeOf("AÇÃO", b.cardTypes);
        const bIsEvent = this.IsCardTypeOf("EVENTO", b.cardTypes);
        if (bIsCreature) {
          bTypeIndex = OrderingPriorities.Creature;
        }
        else if (bIsEquipent) {
          bTypeIndex = OrderingPriorities.Equipment;
        }
        else if (bIsSupport) {
          bTypeIndex = OrderingPriorities.Support;
        }
        else if (bIsStrategy) {
          bTypeIndex = OrderingPriorities.Strategy;
        }
        else if (bIsAction) {
          bTypeIndex = OrderingPriorities.Action;
        }
        else if (bIsEvent) {
          bTypeIndex = OrderingPriorities.Event;
        }

        //#endregion

        if (aTypeIndex !== bTypeIndex &&
          aTypeIndex > -1 && bTypeIndex > -1
        ) {
          return bTypeIndex > aTypeIndex ? 1 : -1;
        }
        else if (a.galaxy !== b.galaxy) {
          return this.OrderCards(a, b, { value: OrderingOptions.Galaxy, direction: OrderingDirections.Ascending });
        }
        else {
          return this.OrderCards(a, b, { value: OrderingOptions.Name, direction: OrderingDirections.Ascending });
        }
      }
    });
    return orderedCards;
  }

  OrderDeckCards (cardsList) {
    const normals = cardsList.filter(card => !card.specialCard);
    const normalsOrdered = this.OrderCardsList(normals);

    const specials = cardsList.filter(card => card.specialCard && !this.IsCardTypeOf('FORTALEZA', card.cardTypes) && !this.IsCardTypeOf('RECURSO', card.cardTypes));
    const specialsOrdered = this.OrderCardsList(specials);

    const resources = cardsList.filter(card => !!this.IsCardTypeOf('RECURSO', card.cardTypes));
    const resourcesOrdered = this.OrderCardsList(resources);

    const fortresses = cardsList.filter(card => !!this.IsCardTypeOf('FORTALEZA', card.cardTypes));
    const fortressesOrdered = this.OrderCardsList(fortresses);
    
    let orderedCards = [];
    for (let i = 0; i < normalsOrdered.length; i++) {
      orderedCards.push(normalsOrdered[i]);
    }
    for (let i = 0; i < specialsOrdered.length; i++) {
      orderedCards.push(specialsOrdered[i]);
    }
    for (let i = 0; i < resourcesOrdered.length; i++) {
      orderedCards.push(resourcesOrdered[i]);
    }
    for (let i = 0; i < fortressesOrdered.length; i++) {
      orderedCards.push(fortressesOrdered[i]);
    }
    
    return orderedCards;
  }

  ToggleFilter (filterType, value) {
    if (!this.IsFilterSelected(filterType, value)) {
      this.advancedFilters.push({ "filterType": filterType, "value": value });
    }
    else {
      var index = -1;
      this.advancedFilters.forEach((filter, i) => {
        if (filter.filterType === filterType && filter.value === value) {
          index = i;
        }
      });
      this.advancedFilters.splice(index, 1);
    }

    this.setAdvancedFilters(this.advancedFilters);
  }

  IsFilterSelected(filterType, value) {
    return this.advancedFilters.filter(p => p.filterType === filterType && p.value === value).length > 0;
  }

  GetFilterClass(filterType, value) {
    return `deckBuilder-filterContainer-item bt-filterOption ${this.IsFilterSelected(filterType, value) ? 'filter-selected' : ''}`;
  }

  //#endregion

}