import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { dataFromSearch } from '../api/example.search-data';
import {
  CoinPortfolio,
  RowInfo,
} from 'src/app/interfaces/coin-portfolio.interface';

@Injectable({
  providedIn: 'root',
})
export class NewRowService {
  displayedColumns = [
    'logoFirst',
    'cryptoFirst',
    'logoSecond',
    'cryptoSecond',
    'multiply',
    'price',
    'gain',
  ];

  dataSource!: any;
  cryptoInfoList!: CoinPortfolio[];
  isEmpty: boolean = true;
  hopiumMultiply!: number;
  hopiumPrice!: number;
  tableRowList: RowInfo[] = [];

  constructor() {}

  // carga datos mokeados desde hopiumfolio/api

  newRow(dataFromSearch: CoinPortfolio[]): void {
    this.cryptoInfoList = dataFromSearch;
    this.isEmpty = false;
    this.tableRowList.push(this.createRowInfo());
    this.dataSource = new MatTableDataSource<RowInfo>(this.tableRowList);
    console.log(this.dataSource);
  }

  getHopiumMultiplier() {
    return (
      Math.round(
        (this.cryptoInfoList[1].market_cap /
          this.cryptoInfoList[0].market_cap) *
          100
      ) / 100
    );
  }

  getHopiumPrice(mult: number) {
    return Math.round(this.cryptoInfoList[0].current_price * mult * 100) / 100;
  }

  isPortfolioEmpty() {
    return this.cryptoInfoList.length === 0 ? true : false;
  }

  createRowInfo(): RowInfo {
    this.hopiumMultiply = this.getHopiumMultiplier();
    this.hopiumPrice = this.getHopiumPrice(this.hopiumMultiply);

    return {
      logoFirst: this.cryptoInfoList[0].image,
      cryptoFirst: this.cryptoInfoList[0].symbol.toUpperCase(),
      logoSecond: this.cryptoInfoList[1].image,
      cryptoSecond: this.cryptoInfoList[1].symbol.toUpperCase(),
      multiply: this.hopiumMultiply,
      price: this.hopiumPrice,
      gain: 0,
    };
  }

  delete() {
    this.tableRowList = [];
  }
}
