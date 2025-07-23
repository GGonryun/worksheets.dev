import QuickLRU from 'quick-lru';

export type NumberLike = {
  //
};

export class PositiveNumber implements NumberLike {
  private static cache = new QuickLRU<number, PositiveNumber>({
    maxSize: 5000,
  });

  static _brand = 'PositiveNumber';
  private constructor(private n: number) {}
  get value() {
    return this.n;
  }

  static of(n: number) {
    if (n < 0) throw new Error('Value must be positive');

    const cached = this.cache.get(n);
    if (cached) return cached;

    const instance = new PositiveNumber(n);
    this.cache.set(n, instance);
    return instance;
  }

  clone() {
    return PositiveNumber.of(this.n);
  }

  plus(n: number) {
    return PositiveNumber.of(this.n + n);
  }
}

export class WholeNumber implements NumberLike {
  private static cache = new QuickLRU<number, WholeNumber>({ maxSize: 5000 });

  static of(n: number) {
    if (!Number.isInteger(n)) throw new Error('Value must be a whole number');

    const cached = this.cache.get(n);
    if (cached) return cached;

    const instance = new WholeNumber(n);
    this.cache.set(n, instance);
    return instance;
  }

  _brand = 'WholeNumber';
  private constructor(private n: number) {}
  get value() {
    return this.n;
  }
}

export class PositiveWholeNumber implements NumberLike {
  private static cache = new QuickLRU<number, PositiveWholeNumber>({
    maxSize: 5000,
  });

  static of(n: number) {
    if (!Number.isInteger(n) || n < 0)
      throw new Error('Value must be a whole number');

    const cached = this.cache.get(n);
    if (cached) return cached;

    const instance = new PositiveWholeNumber(n);
    this.cache.set(n, instance);
    return instance;
  }

  static round(n: number) {
    return PositiveWholeNumber.of(Math.round(n));
  }

  static max(...n: PositiveWholeNumber[]) {
    return n.reduce((max, current) =>
      current.value > max.value ? current : max
    );
  }

  _brand = 'PositiveWholeNumber';
  private constructor(private n: number) {}
  get value() {
    return this.n;
  }

  clone() {
    return PositiveWholeNumber.of(this.n);
  }
  plus(amount: number) {
    return PositiveWholeNumber.of(this.n + amount);
  }
}
