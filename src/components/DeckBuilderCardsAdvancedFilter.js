import React from 'react';
import { CardRarities, CardType, CreatureAbilities, CreatureCardsSubtypes, EffectTriggers, Galaxies, SupportCardsSubtypes } from '../models/CardsInfos';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { CardFilterOptions } from '../models/CardFilterOptions';

import iconSearch from '../images/lupa.png';
import iconBack from '../images/voltar.png';

import iconGaia from '../images/pedras/Pedra1-icon.png';
import iconMajik from '../images/pedras/Pedra2-icon.png';
import icon1 from '../images/pedras/Pedra4-icon.png';
import icon2 from '../images/pedras/Pedra3-icon.png';
import icon3 from '../images/pedras/Pedra5-icon.png';
import iconAdroit from '../images/pedras/Pedra6-icon.png';
import iconStroj from '../images/pedras/Pedra7-icon.png';

import iconComum from '../images/raridade comum.png';
import iconRara from '../images/raridade rara.png';
import iconLendaria from '../images/raridade Lendária.png';
import iconEpica from '../images/raridade épica.png';

import iconContraAtaque from '../images/habilidades/habilidade contra-ataque.png'
import iconAgilidade from '../images/habilidades/habilidade agilidade.png'
import iconIntuicao from '../images/habilidades/habilidade intuição.png'
import iconVoar from '../images/habilidades/habilidade voo.png'
import iconEsconder from '../images/habilidades/habilidade esconder.png'
import iconMultiataque from '../images/habilidades/habilidade multiataque.png'
import iconTeletransporte from '../images/habilidades/habilidade teletransporte.png'
import iconSuperVelocidade from '../images/habilidades/habilidade super-velocidade.png'
import iconAlvoPrimario from '../images/habilidades/habilidade alvo-primário.png'
import iconAlcance1 from '../images/habilidades/alcance 1.png'
import iconAlcance2 from '../images/habilidades/alcance 2.png'
import iconAlcance3 from '../images/habilidades/alcance 3.png'

import iconInstantaneo from '../images/habilidades/efeito instantâneo.png'
import iconUnicoGolpe from '../images/habilidades/efeito único golpe.png'
import iconInteligente from '../images/habilidades/efeito inteligente.png'
import iconPermanente from '../images/habilidades/efeito permanente.png'
import iconResposta from '../images/habilidades/efeito resposta.png'
import iconUltimoGolpe from '../images/habilidades/efeito último golpe.png'
import iconAntecipacao from '../images/habilidades/efeito antecipação.png'
import iconCombate from '../images/habilidades/efeito combate.png'

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

  function SendToCardList() {
    props.setViewState(DeckBuilderViewStates.CardsList);
    props.setShowBottomMenu(!props.isDeckEdit);
  }

  function ClearCardsFilters() {
    props.ClearCardsFilters();
    // props.forceUpdate();
  }


  function ToggleGalaxyFilterSelected(galaxy) {
    props.ToggleGalaxyFilterSelected(galaxy);
    SearchCard();
  }

  function ToggleCategoryFilterSelected(category) {
    props.ToggleCategoryFilterSelected(category);
    SearchCard();
  }

  function TotalCount() {
    if (props.IsCategoryFilterSelected('normals')) {
      return props.countNormals;
    }
    else if (props.IsCategoryFilterSelected('specials')) {
      return props.countSpecials;
    }
    else if (props.IsCategoryFilterSelected('fortress')) {
      return props.countFortress;
    }
    return props.countNormals + props.countSpecials + props.countFortress;
  }

  return (
    <>
      <div className='bt-deckBuilder bt-back' onClick={() => { SendToCardList() }}>
        <img alt="Voltar" src={iconBack}></img>
      </div>
      <div className='deckBuilder-header-block'>
        <div className='title'>
          FILTRAR CARDS
          <div className='deckBuilder-cards-results'><span className='deckBuilder-cards-results-info'>{TotalCount()}</span> <span className='deckBuilder-cards-results-label'> cards encontrados</span></div>
        </div>
        <div className='header-options'>
          <button className="action" onClick={() => SendToCardList()}>
            Mostrar
          </button>
          <button className="limpar" onClick={() => ClearCardsFilters()}>
            Limpar
          </button>

        </div>
      </div>
      <div className='bt-deckBuilder bt-deckBuilder-search margin-top-2' onClick={() => { SearchCard() }}>
        <input type="text" id="search-card-input" placeholder='Pesquisar...'></input>
        <img alt="Busca" src={iconSearch}></img>
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

export class DeckBuilderCardsAdvancedFilter extends React.Component {

  SendToCardList() {
    this.props.setViewState(DeckBuilderViewStates.CardsList);
    this.props.setShowBottomMenu(!this.props.isDeckEdit);
  }

  SearchCard() {
    const input = document.getElementById("search-card-input");
    if (input && input.value) {
      this.props.SearchCard(input.value);
    }
    else {
      this.props.SearchCard();
    }
  }

  ToggleFilter(filterType, value) {
    this.props.ToggleFilter(filterType, value);
    this.SearchCard();
  }

  ClearCardsFilters() {
    this.props.ClearCardsFilters();
    this.forceUpdate();
  }

  get totalCount() {
    if (this.props.IsCategoryFilterSelected('normals')) {
      return this.props.countNormals;
    }
    else if (this.props.IsCategoryFilterSelected('specials')) {
      return this.props.countSpecials;
    }
    else if (this.props.IsCategoryFilterSelected('fortress')) {
      return this.props.countFortress;
    }
    return this.props.countNormals + this.props.countSpecials + this.props.countFortress;
  }



  get CreatureCardsSubtypesSection() {
    let ret = [];

    let count = 0;
    let maxColumns = 9999;
    let rowsCount = CreatureCardsSubtypes.length / maxColumns;


    if (CreatureCardsSubtypes.length % maxColumns > 0) rowsCount++;
    for (let rowI = 0; rowI < rowsCount; rowI++) {
      let columns = CreatureCardsSubtypes.filter((p, i) => i >= count && i < count + maxColumns);

      function compareStrings(a, b) {
        return a.localeCompare(b, 'pt', { sensitivity: 'base' });
      }
      ret.push(
        // <div className="deckBuilder-filter-container">
        <div className='deckBuilder-filter-items'>
          {columns.sort(compareStrings).map((subtype, i) =>
            <div className={this.props.GetFilterClass(CardFilterOptions.Subtype, subtype) + ' model-2'} key={i}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Subtype, subtype) }}>
              <span>{subtype}</span>
            </div>
          )}
        </div>
        // </div>
      );
      count += maxColumns;
    }

    return ret;
  }

  get SupportCardsSubtypesSection() {
    let ret = [];

    let count = 0;
    let maxColumns = 99999;
    let rowsCount = SupportCardsSubtypes.length / maxColumns;
    if (CreatureCardsSubtypes.length % maxColumns > 0) rowsCount++;
    for (let rowI = 0; rowI < rowsCount; rowI++) {
      let columns = SupportCardsSubtypes.filter((p, i) => i >= count && i < count + maxColumns);
      ret.push(
        <div className='deckBuilder-filter-items'>
          {columns.map((subtype, i) =>
            <div className={this.props.GetFilterClass(CardFilterOptions.Subtype, subtype) + ' model-2'} key={i}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Subtype, subtype) }}>
              <span>{subtype}</span>
            </div>
          )}
        </div>
      );
      count += maxColumns;
    }

    return ret;
  }

  render() {
    return (
      <>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Nível</span>
          </div>
          <div className='deckBuilder-filter-items-closed'></div>

          <div className='deckBuilder-filter-items'>
            <div className={this.props.GetFilterClass(CardFilterOptions.BaseCost, 0) + ' model-1'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.BaseCost, 0) }}>
              <span>0</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.BaseCost, 1) + ' model-1'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.BaseCost, 1) }}>
              <span>1</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.BaseCost, 2) + ' model-1'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.BaseCost, 2) }}>
              <span>2</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.BaseCost, 3) + ' model-1'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.BaseCost, 3) }}>
              <span>3</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.BaseCost, 4) + ' model-1'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.BaseCost, 4) }}>
              <span>4</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.BaseCost, 5) + ' model-1'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.BaseCost, 5) }}>
              <span>5</span>
            </div>
          </div>
        </div>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Energia</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          <div className='deckBuilder-filter-items'>
            {this.props.cardEffectsCosts.map((effectCost, i) =>
              <div className={this.props.GetFilterClass(CardFilterOptions.EffectCost, effectCost) + ' model-1'} key={i}
                onClick={() => { this.ToggleFilter(CardFilterOptions.EffectCost, effectCost) }}>
                <span>{effectCost < 99 ? effectCost : "X"}</span>
              </div>
            )}
          </div>
        </div>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Tipo de Card</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          <div className='deckBuilder-filter-items'>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Creature) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Creature) }}>
              <span>Criatura</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Action) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Action) }}>
              <span>Ação</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Event) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Event) }}>
              <span>Evento</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Resource) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Resource) }}>
              <span>Recurso</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Support) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Support) }}>
              <span>Suporte</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Strategy) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Strategy) }}>
              <span>Estratégia</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.CardType, CardType.Equipment) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.CardType, CardType.Equipment) }}>
              <span>Equipamento</span>
            </div>
          </div>
        </div>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Habilidade</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          <div className='deckBuilder-filter-items'>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.CounterDamage) + ' model-3'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.CounterDamage) }}>
              <img alt='Contra-ataque' src={iconContraAtaque}></img>
              <span className='text-icon'>Contra-ataque</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Agility) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Agility) }}>
              <img alt='Agilidade' src={iconAgilidade}></img>
              <span className='text-icon'>Agilidade</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Intuition) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Intuition) }}>
              <img alt='Intuição' src={iconIntuicao}></img>
              <span className='text-icon'>Intuição</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Flight) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Flight) }}>
              <img alt='Voar' src={iconVoar}></img>
              <span className='text-icon'>Voar</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Hide) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Hide) }}>
              <img alt='Esconder' src={iconEsconder}></img>
              <span className='text-icon'>Esconder</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.MultiAttack) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.MultiAttack) }}>
              <img alt='Multiataque' src={iconMultiataque}></img>
              <span className='text-icon'>Multiataque</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.Teletransport) + ' model-3'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.Teletransport) }}>
              <img alt='Teletransporte' src={iconTeletransporte}></img>
              <span className='text-icon'>Teletransporte</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.SuperSpeed) + ' model-3'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.SuperSpeed) }}>
              <img alt='Super-Velocidade' src={iconSuperVelocidade}></img>
              <span className='text-icon'>Super-Velocidade</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Ability, CreatureAbilities.PrimaryTarget) + ' model-3'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Ability, CreatureAbilities.PrimaryTarget) }}>
              <img alt='Alvo-Primário' src={iconAlvoPrimario}></img>
              <span className='text-icon'>Alvo-Primário</span>
            </div>
          </div>
        </div>

        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Alcance</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          <div className='deckBuilder-filter-items'>
            <div className={this.props.GetFilterClass(CardFilterOptions.Range, 1) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Range, 1) }}>
              <img alt='Alcance 1' src={iconAlcance1}></img>
              <span className='text-icon'>Alcance 1</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Range, 2) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Range, 2) }}>
              <img alt='Alcance 3' src={iconAlcance2}></img>
              <span className='text-icon'>Alcance 2</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Range, 3) + ' model-2'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Range, 3) }}>
              <img alt='Alcance 2' src={iconAlcance3}></img>
              <span className='text-icon'>Alcance 3</span>
            </div>
          </div>
        </div>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Tipo de Efeito</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          <div className='deckBuilder-filter-items'>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Instant) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Instant) }}>
              <img alt='Instantâneo' src={iconInstantaneo}></img>
              <span className='text-icon'>Instantâneo</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.UniqueHit) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.UniqueHit) }}>
              <img alt='Único golpe' src={iconUnicoGolpe}></img>
              <span className='text-icon'>Único golpe</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Intelligent) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Intelligent) }}>
              <img alt='Inteligente' src={iconInteligente}></img>
              <span className='text-icon'>Inteligente</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Permanent) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Permanent) }}>
              <img alt='Permanente' src={iconPermanente}></img>
              <span className='text-icon'>Permanente</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Answer) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Answer) }}>
              <img alt='Resposta' src={iconResposta}></img>
              <span className='text-icon'>Resposta</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.LastHit) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.LastHit) }}>
              <img alt='Último golpe' src={iconUltimoGolpe}></img>
              <span className='text-icon'>Último golpe</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Anticipation) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Anticipation) }}>
              <img alt='Antecipação' src={iconAntecipacao}></img>
              <span className='text-icon'>Antecipação</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.EffectTrigger, EffectTriggers.Combat) + ' model-4'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.EffectTrigger, EffectTriggers.Combat) }}>
              <img alt='Combate' src={iconCombate}></img>
              <span className='text-icon'>Combate</span>
            </div>
          </div>
        </div>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Raridade</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          <div className='deckBuilder-filter-items'>
            <div className={this.props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Common) + ' model-5'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Rarity, CardRarities.Common) }}>
              <img alt='Comum' className='img-raridade' src={iconComum}></img>
              <span >Comum</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Rare) + ' model-5'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Rarity, CardRarities.Rare) }}>
              <img alt='Rara' className='img-raridade' src={iconRara}></img>
              <span >Rara</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Epic) + ' model-5'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Rarity, CardRarities.Epic) }}>
              <img alt='Épica' className='img-raridade' src={iconEpica}></img>
              <span >Épica</span>
            </div>
            <div className={this.props.GetFilterClass(CardFilterOptions.Rarity, CardRarities.Legendary) + ' model-5'}
              onClick={() => { this.ToggleFilter(CardFilterOptions.Rarity, CardRarities.Legendary) }}>
              <img alt='Lendária' className='img-raridade' src={iconLendaria}></img>
              <span >Lendária</span>
            </div>
          </div>
        </div>

        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Raças e Tipos de Criatura</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          {this.CreatureCardsSubtypesSection.map((p, i) => <>{p}</>)}
        </div>
        <div className='deckBuilder-filter-container'>
          <div className='deckBuilder-filter-title'>
            <span>Tipos de Suporte</span>
          </div>
          <div className='deckBuilder-filter-closed'></div>

          {this.SupportCardsSubtypesSection.map((p, i) => <>{p}</>)}
        </div>
        {/*         
        <button className="action padding-top-1 padding-bottom-1 margin-top-3 margin-bottom-3 padding-left-1 padding-right-1" onClick={() => this.SendToCardList()}>
          Mostrar {this.totalCount} resultados
        </button>
        <br />
        <span onClick={() => { this.ClearCardsFilters() }} className='text-underline padding-bottom-3'>Limpar filtros</span> 
        */}

      </>
    );
  }

}