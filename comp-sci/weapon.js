class Weapon {
  constructor(options) {
    const { damage, type } = options;
    this.damage = damage || 1;
    this.type = type || 'melee';
  }
}

class Gun extends Weapon {
  static pistolDefaults = {
    subType: 'pistol',
    maxCapacity: 12,
    carryCapacity: 42,
    damage: 3,
    type: 'projectile',
    rounds: 0,
    fireRate: 500 // in ms
  };

  constructor(options) {
    super({ type: 'projectile', ...options });

    const { subType, maxCapacity, carryCapacity, rounds } = options;
    this.subType = subType || pistolDefaults.subType;
    this.maxCapacity = maxCapacity || pistolDefaults.maxCapacity;
    this.carryCapacity = carryCapacity || pistolDefaults.carryCapacity;
    this.rounds = rounds || pistolDefaults.rounds;
  }

  reload = (rounds) => {
    this.rounds += rounds;
  };

  fire = () => {
    this.rounds -= 1;
  };
}

const deagle = new Gun({
  type: 'pistol',
  maxCapacity: 9,
  carryCapacity: 27,
  damage: 5,
  rounds: 0
});

const m4 = new Gun({
  type: 'semi-auto',
  maxCapacity: 30,
  carryCapacity: 120,
  damage: 2,
  rounds: 0
});