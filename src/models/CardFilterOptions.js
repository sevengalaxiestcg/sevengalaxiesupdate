export class CardFilterOptions {
  static BaseCost =  0;
  static EffectCost = 2;
  static IllustratorName = 4;
  static Attack = 5;
  static Shield = 6;
  static CounterDamage = 7;
  static DateLaunched = 8;
  static LifePoints = 9;
  static Range = 10;
  /* COMBINED WITH OTHER ENUMERATOS */
  static Galaxy = 1; // Galaxies
  static Rarity = 3; // CardRarities
  static Subtype = 11; // no enumerator, but given by String
  static Ability = 12; // CreatureAbilities
  static EffectTrigger = 13; // EffectTriggers
  static CardType = 14; // CardType
}

export var currentFilterOptions = [CardFilterOptions.BaseCost, CardFilterOptions.EffectCost, CardFilterOptions.CardType,
  CardFilterOptions.Ability, CardFilterOptions.EffectTrigger, CardFilterOptions.Rarity];