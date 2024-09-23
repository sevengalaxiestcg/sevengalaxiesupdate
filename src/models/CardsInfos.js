export class Deck {
  constructor() {
    this.cards = [];
    this.name = "";
    this.thumb = "";
    this.creationDate = undefined;
  }
}

export class Card {
  constructor() {
    this.key = "";
    this.code = "";
    this.galaxy = Galaxies.Undefined;
    this.name = "";
    this.group = "";
    this.thumb = "";
    this.specialCard = false;
    this.cost = 0;
    this.costType = CostTypes.Undefined;
    this.effects = [];
    this.cardTypes = [];
    this.cardSubtypes = [];
    this.dateLaunched = undefined;
    this.rarity = CardRarities.Undefined;
    this.description = "";
    this.illustrator = "";
    // for amount count in deck
    this.amount = 0;
    // for creatures
    this.lifePoints = 0;
    this.attack = 0;
    this.shield = 0;
    this.range = 0;
    this.abilities = [];
    this.counterDamage = 0;
    this.agilityCost = 0;
    this.multiAttackType = CreatureMultiAttackTypes.Undefined;
  }
}

export class Effect {
  constructor() {
    this.costs = [];
    this.description = "";
    this.trigger = EffectTriggers.Undefined;
    this.super = false;
    this.required = false;
    // for equipments
    this.effectBonuses = [];
  }
}

export class EffectCost {
  constructor() {
    this.costType = CostTypes.Undefined;
    this.costAmount = 0;
    this.paymentRequired = false;
  }
}

export class EffectBonus {
  constructor() {
    this.bonusAmount = 0;
    this.multiAttackType = CreatureMultiAttackTypes.Undefined;
    this.bonusType = EffectBonusTypes.Undefined;
    this.temporary = false;
  }
}

export class Galaxies {
  static Undefined = 0;
  static Gaia = 1;
  static Stroj = 2;
  static Majik = 3;
  static Adroit = 4;
}

export class CostTypes {
  static Undefined = 0;
  static Energy = 1;
  static Level = 2;
}

export class CardType {
  static Undefined = 0;
  static Resource = 1;
  static Creature = 2;
  static Equipment = 3;
  static Action = 4;
  static Support = 5;
  static Strategy = 6;
  static Event = 7;
  static BattleLeader = 8;
  static Fortress = 9;
}

export class CardRarities {
  static Undefined = 0;
  static Common = 1;
  static Rare = 2;
  static Epic = 3;
  static Legendary = 4;
}

export class CreatureAbilities {
  static Undefined = 0;
  static CounterDamage = 4;
  static MultiAttack = 3;
  static Hide = 1;
  static Agility = 2;
  static PrimaryTarget = 5;
  static Flight = 6;
  static Teletransport = 9;
  static SuperSpeed = 7;
  static Intuition = 8;
}

export class CreatureMultiAttackTypes {
  static Undefined = 0;
  static FrontAndBack = 10;
  static DiagonalBackLeft = 8;
  static DiagonalBackRight = 9;
  static Front = 1;
  static Back = 3;
  static LeftAndRight = 5;
  static DiagonalFrontLeft = 6;
  static DiagonalFrontRight = 7;
  static Left = 2;
  static Right = 4;
}

export class EffectTriggers {
  static Undefined = 0;
  static Instant = 1;
  static UniqueHit = 2;
  static Intelligent = 3;
  static Permanent = 4;
  static Answer = 5;
  static LastHit = 6;
  static Anticipation = 7;
  static Combat = 8;
}

export class EffectBonusTypes {
  static Undefined = 0;
  static Attack = 1;
  static Shield = 2;
  static LifePoints = 3;
  static CounterDamage = 4;
  static Agility = 5;
  static MultiAttack = 6;
  static Energy = 7;
  static Level = 8;
  static Range = 9;
  static FullProtection = 10; // "Proteção" (contra tudo)
  static AttackProtection = 11; // Proteção contra mira
  static LifeProtection = 12;
  static EffectsProtection = 13;
  static DirectDamage = 14;
  static DirectPenetrationDamage = 15;
}

export const CreatureCardsSubtypes = [
  // Races
  "Animal",
  "Árvore",
  "Brownsly",
  "Centauro",
  "Dragão",
  "Elfo",
  "Glummun",
  "Goblin",
  "Greensly",
  "Híbrido",
  "Humano",
  "Kal",
  "Kroll",
  "Lycan",
  "Omni-Zen",
  "Orc",
  "Robô",
  "Tetrion",
  // Other subtypes
  "Água",
  "Amazona",
  "Animóide",
  "Arqueiro",
  "Atirador",
  "Ave",
  "Comandante",
  "Combatente",
  "Defensor",
  "Feiticeiro",
  "Gelo",
  "Goldron",
  "Gosma",
  "Guerreiro",
  "Guerrilheiro",
  "Ladino",
  "Lutador",
  "Mago",
  "Manipulador",
  "Mestre",
  "Nattur",
  "Operador",
  "Pedra",
  "Sentinela",
  "Unicórnio",
  "Verme",
];

export const SupportCardsSubtypes = [
  "Armamento",
  "Fonte",
  "Mecanismo",
  "Nave",
];