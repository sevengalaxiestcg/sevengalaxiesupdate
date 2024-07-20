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
  static Name = 13;
  static Key = 14;
}

export class OrderingDirections {
  static Ascending = -1;
  static Descending = -2;
}

export var basicOrderingOptions = [
  {
    isTitle: true,
    label: "titleOrderOptions",
    value: "CLASSIFICAR POR:",
  },
  {
    label: "Código",
    value: OrderingOptions.Code,
    isOrdering: true,
    isSelected: true,
  },
  {
    label: "Número",
    value: OrderingOptions.Key,
    isOrdering: true,
  },
  {
    label: "Nível",
    value: OrderingOptions.BaseCost,
    isOrdering: true,
  },
  {
    label: "Energia",
    value: OrderingOptions.EffectCost,
    isOrdering: true,
  },
  {
    label: "Nome",
    value: OrderingOptions.Name,
    isOrdering: true,
  },
  {
    label: "Raridade",
    value: OrderingOptions.Rarity,
    isOrdering: true,
  },
  {
    label: "Vida",
    value: OrderingOptions.LifePoints,
    isOrdering: true,
  },
  {
    label: "Ataque",
    value: OrderingOptions.Attack,
    isOrdering: true,
  },
  {
    label: "Escudo",
    value: OrderingOptions.Shield,
    isOrdering: true,
  },
  {
    label: "Contra-ataque",
    value: OrderingOptions.CounterDamage,
    isOrdering: true,
  },
  // {
  //   label: "Alcance",
  //   value: OrderingOptions.Range,
  //   isOrdering: true,
  // },
  // {
  //   label: "Galáxia",
  //   value: OrderingOptions.Galaxy,
  //   isOrdering: true,
  // },
  // {
  //   label: "Subtipos",
  //   value: OrderingOptions.Subtype,
  //   isOrdering: true,
  // },
  // {
  //   label: "Ilustrador",
  //   value: OrderingOptions.IllustratorName,
  //   isOrdering: true,
  // },
  // {
  //   label: "Data de Lançamento",
  //   value: OrderingOptions.DateLaunched,
  //   isOrdering: true,
  // },
  {
    isTitle: true,
    label: "titleOrderDirection",
    value: "ORDEM:",
  },
  {
    label: "Crescente",
    value: OrderingDirections.Ascending,
    isDirection: true,
    isSelected: true,
  },
  {
    label: "Decrescente",
    value: OrderingDirections.Descending,
    isDirection: true,
  },
];