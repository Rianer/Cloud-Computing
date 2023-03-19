export class DBCar {
  constructor(id, type, maker, year, store_id, model) {
    this.id = id;
    this.type = type;
    this.maker = maker;
    this.year = year;
    this.store_id = store_id;
    this.model = model;
  }

  static from(json) {
    return Object.assign(new DBCar(), json);
  }
}

export class Car {
  constructor(maker, year, model) {
    this.make = maker;
    this.year = year;
    this.model = model;
  }
}
