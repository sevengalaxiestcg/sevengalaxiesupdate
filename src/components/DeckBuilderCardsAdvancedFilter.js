import React from 'react';
import { CardRarities, CardType, CreatureAbilities, EffectTriggers, Galaxies } from '../models/CardsInfos';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { CardFilterOptions } from '../models/CardFilterOptions';

import iconSearch from '../images/lupa.png';
import iconBack from '../images/seta_.png';
import iconGaia from '../images/pedras/Gaia.png';
import iconStroj from '../images/pedras/Stroj.png';
import iconMajik from '../images/pedras/Majik.png';
import iconAdroit from '../images/pedras/Adroit.png';
import icon3 from '../images/pedras/3-2.png';
import icon2 from '../images/pedras/2-2.png';
import icon1 from '../images/pedras/1-2.png';

export function DeckBuilderCardsAdvancedFilterHeader(props) {

  function SearchCard() {
    const input = document.getElementById("search-card-input");
    if (input && input.value) {
      props.SearchCard(input.value);
    }
    else {
      props.SearchCard();
    }
  }

  function SendToCardList () {
    props.setViewState(DeckBuilderViewStates.CardsList);
    props.setShowBottomMenu(!props.isDeckEdit);
  }

  function ToggleGalaxyFilterSelected(galaxy) {
    props.ToggleGalaxyFilterSelected(galaxy);
    SearchCard();
  }
  
  function ToggleCategoryFilterSelected(category) {
    props.ToggleCategoryFilterSelected(category);
    SearchCard();
  }

  return (
    <>
      <div className='bt-deckBuilder bt-back' onClick={() => { SendToCardList() }}>
        <img alt="Voltar" src={iconBack}></img>
      </div>
      <div className='deckBuilder-header-block'>
        <div className='title'>
          FILTRAR CARDS
        </div>
      </div>
      <div className='bt-deckBuilder bt-deckBuilder-search margin-top-2' onClick={() => { SearchCard() }}>
        <input type="text" id="search-card-input" placeholder='Pesquisar...'></input>
        <img alt="Busca" src={iconSearch}></img>
        {/* <div className={"burger-menu open"} onClick={() => ResetInputSearch()} >
          <div className="bar1" key="b1" />
          <div className="bar2" key="b2" />
          <div className="bar3" key="b3" />
        </div> */}
      </div>
      <div className='deckBuilder-galaxiesContainer'>
        <div className={ props.GetGalaxyClass(Galaxies.Gaia) }
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Gaia) }}>
          <img alt="Gaia" src={iconGaia}></img>
        </div>
        <div className={ props.GetGalaxyClass(Galaxies.Majik) }
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
        <div className={ props.GetGalaxyClass(Galaxies.Adroit) }
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Adroit) }}>
          <img alt="Adroit" src={iconAdroit}></img>
        </div>
        <div className={ props.GetGalaxyClass(Galaxies.Stroj) }
          onClick={() => { ToggleGalaxyFilterSelected(Galaxies.Stroj) }}>
          <img alt="Stroj" src={iconStroj}></img>
        </div>
      </div>
      <div className='deckBuilder-cards-categories'>
        <div className={ props.GetCategoryClass('normals') }
          onClick={() => { ToggleCategoryFilterSelected('normals') }}>
          <span className='count'>{props.countNormals}</span>
          <span className='title'> Normais</span>
        </div>
        <div className={ props.GetCategoryClass('specials') }
          onClick={() => { ToggleCategoryFilterSelected('specials') }}>
          <span className='count'>{props.countSpecials}</span>
          <span className='title'> Especiais</span>
        </div>
        <div className={ props.GetCategoryClass('fortress') }
          onClick={() => { ToggleCategoryFilterSelected('fortress') }}>
          <span className='count'>{props.countFortress}</span>
          <span className='title'> Fortalezas</span>
        </div>
      </div>
    </>
  );

}

export function DeckBuilderCardsAdvancedFilter(props) {

  function SearchCard() {
    const input = document.getElementById("search-card-input");
    if (input && input.value) {
      props.SearchCard(input.value);
    }
    else {
      props.SearchCard();
    }
  }

  function ToggleFilter (filterType, value) {
    props.ToggleFilter(filterType, value);
    SearchCard();
  }

  return (
    <>
      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className='deckBuilder-filterContainer-item title'>
          <span>Custo de nível: </span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.BaseCost, 0) }
          onClick={() => { ToggleFilter(CardFilterOptions.BaseCost, 0) }}>
          <span>0</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.BaseCost, 1) }
          onClick={() => { ToggleFilter(CardFilterOptions.BaseCost, 1) }}>
          <span>1</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.BaseCost, 2) }
          onClick={() => { ToggleFilter(CardFilterOptions.BaseCost, 2) }}>
          <span>2</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.BaseCost, 3) }
          onClick={() => { ToggleFilter(CardFilterOptions.BaseCost, 3) }}>
          <span>3</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.BaseCost, 4) }
          onClick={() => { ToggleFilter(CardFilterOptions.BaseCost, 4) }}>
          <span>4</span>
        </div>
      </div>

      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className='deckBuilder-filterContainer-item title'>
          <span>Custo de efeitos: </span>
        </div>
        {props.cardEffectsCosts.map((effectCost, i) =>
          <div className={ props.GetFilterClass(CardFilterOptions.EffectCost, effectCost) } key={i}
          onClick={() => { ToggleFilter(CardFilterOptions.EffectCost, effectCost) }}>
            <span>{effectCost < 99 ? effectCost : "X"}</span>
          </div>
        )}
      </div>

      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className='deckBuilder-filterContainer-item title'>
          <span>Tipo: </span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Creature) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Creature) }}>
          <span>Criatura</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Action) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Action) }}>
          <span>Ação</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Event) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Event) }}>
          <span>Evento</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Resource) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Resource) }}>
          <span>Recurso</span>
        </div>
      </div>
      <div className='deckBuilder-filterContainer margin-top-1'>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Support) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Support) }}>
          <span>Suporte</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Strategy) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Strategy) }}>
          <span>Estratégia</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Equipment) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Equipment) }}>
          <span>Equipamento</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.CardType, CardType.Fortress) }
          onClick={() => { ToggleFilter(CardFilterOptions.CardType, CardType.Fortress) }}>
          <span>Fortaleza</span>
        </div>
      </div>

      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className='deckBuilder-filterContainer-item title'>
          <span>Habilidade: </span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.CounterDamage) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.CounterDamage) }}>
          <span>Contra-ataque</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Agility) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Agility) }}>
          <span>Agilidade</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Intuition) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Intuition) }}>
          <span>Intuição</span>
        </div>
      </div>
      <div className='deckBuilder-filterContainer margin-top-1'>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Flight) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Flight) }}>
          <span>Voar</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Hide) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Hide) }}>
          <span>Esconder</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.MultiAttack) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.MultiAttack) }}>
          <span>Multiataque</span>
        </div>
      </div>
      <div className='deckBuilder-filterContainer margin-top-1'>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Teletransport) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Teletransport) }}>
          <span>Teletransporte</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.SuperSpeed) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.SuperSpeed) }}>
          <span>Super velocidade</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.PrimaryTarget) }
          onClick={() => { ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.PrimaryTarget) }}>
          <span>Alvo primário</span>
        </div>
      </div>

      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className='deckBuilder-filterContainer-item title'>
          <span>Tipo de Efeito: </span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Instant) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Instant) }}>
          <span>Instantâneo</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Answer) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Answer) }}>
          <span>Resposta</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Intelligent) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Intelligent) }}>
          <span>Inteligente</span>
        </div>
      </div>
      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.UniqueHit) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.UniqueHit) }}>
          <span>Único golpe</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Permanent) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Permanent) }}>
          <span>Permanente</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.LastHit) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.LastHit) }}>
          <span>Último golpe</span>
        </div>
      </div>
      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Anticipation) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Anticipation) }}>
          <span>Antecipação</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Combat) }
          onClick={() => { ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Combat) }}>
          <span>Efeito de combate</span>
        </div>
      </div>

      <div className='deckBuilder-filterContainer margin-top-2'>
        <div className='deckBuilder-filterContainer-item title'>
          <span>Raridade: </span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Common) }
          onClick={() => { ToggleFilter(CardFilterOptions.Rarity, CardRarities.Common) }}>
          <span>Comum</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Rare) }
          onClick={() => { ToggleFilter(CardFilterOptions.Rarity, CardRarities.Rare) }}>
          <span>Rara</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Epic) }
          onClick={() => { ToggleFilter(CardFilterOptions.Rarity, CardRarities.Epic) }}>
          <span>Épica</span>
        </div>
        <div className={ props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Legendary) }
          onClick={() => { ToggleFilter(CardFilterOptions.Rarity, CardRarities.Legendary) }}>
          <span>Lendária</span>
        </div>
      </div>
    </>
  );
}