import Buyable from './Buyable';

export default class Movie implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly author: string,
    readonly price: number,
    readonly year: number,
    readonly city: string,
    readonly tagline: string,
    readonly genre: string[],
    readonly time: string,
  ) {
    this.time = `${time} мин. /${Math.floor(Number(time) / 60)}:${Number(time) % 60}`;
  }
}