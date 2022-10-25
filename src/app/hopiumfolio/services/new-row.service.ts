import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exchange } from 'src/app/interfaces/searchResponse.interface';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';
import { CoinFullData } from 'src/app/interfaces/coin.interface';

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
  tableDataSource!: any;
  tableRowList: RowInfo[] = [];

  cryptoInfoList!: CoinFullData[];

  isEmpty: boolean = true;

  hopiumMultiply!: number;
  hopiumPrice!: number;

  constructor() {}

  newRow(dataFromSearch: CoinFullData[]): void {
    this.cryptoInfoList = dataFromSearch.flat();
    this.isEmpty = false;
    this.tableRowList.push(this.createRowInfo());
    this.tableDataSource = new MatTableDataSource<RowInfo>(this.tableRowList);
    console.log(this.tableRowList);
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
