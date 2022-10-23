import { Injectable } from '@angular/core';
import { CoinPortfolio } from 'src/app/interfaces/coin-portfolio.interface';

@Injectable({
  providedIn: 'root',
})
export class NewRowService {
  portfolioRow!: CoinPortfolio[];
  isEmpty: boolean = true;
  hopiumMultiply!: number;
  hopiumPrice!: number;
  constructor() {}

  // carga datos mokeados desde hopiumfolio/api

  newRow(dataFromSearch: CoinPortfolio[]): void {
    this.portfolioRow = dataFromSearch;
    this.isEmpty = false;
    this.hopiumMultiply = this.getHopiumMultiplier();
    this.hopiumPrice = this.getHopiumPrice(this.hopiumMultiply);

    console.log(this.portfolioRow);
  }

  getHopiumMultiplier() {
    return (
      Math.round(
        (this.portfolioRow[1].market_cap / this.portfolioRow[0].market_cap) *
          100
      ) / 100
    );
  }

  getHopiumPrice(mult: number) {
    return Math.round(this.portfolioRow[0].current_price * mult * 100) / 100;
  }

  isPortfolioEmpty() {
    return this.portfolioRow.length === 0 ? true : false;
  }
}
