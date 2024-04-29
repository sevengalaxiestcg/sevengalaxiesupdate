export class OrderingOptions {
  static BaseCost =  0;
  static Galaxy = 1;
  static EffectCost = 2;
  static Rarity = 3;
  static IllustratorName = 4;
  static Code = 5;
  static Attack = 6;
  static Shield = 7;
  static CounterDamage = 8;
  static DateLaunched = 9;
  static Subtype = 10;
  static LifePoints = 11;
  static Range = 12;
}

export var basicOrderingOptions = [
  {
    label: "Custo de Nível",
    value: OrderingOptions.BaseCost
  },
  {
    label: "Raridade",
    value: OrderingOptions.Rarity
  },
  {
    label: "Código do Card",
    value: OrderingOptions.Code
  },
  {
    label: "Pontos de Vida",
    value: OrderingOptions.LifePoints
  },
  {
    label: "Ataque",
    value: OrderingOptions.Attack
  },
  {
    label: "Escudo",
    value: OrderingOptions.Shield
  },
  {
    label: "Contra-ataque",
    value: OrderingOptions.CounterDamage
  },
  {
    label: "Alcance",
    value: OrderingOptions.Range
  },
  {
    label: "Galáxia",
    value: OrderingOptions.Galaxy
  },
  {
    label: "Subtipos",
    value: OrderingOptions.Subtype
  },
  {
    label: "Custo de Efeito",
    value: OrderingOptions.EffectCost
  },
  {
    label: "Ilustrador",
    value: OrderingOptions.IllustratorName
  },
  {
    label: "Data de Lançamento",
    value: OrderingOptions.DateLaunched
  },
];