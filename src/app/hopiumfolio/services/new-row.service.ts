import { Injectable, OnInit } from '@angular/core';
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
    'amountToken',
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
  //hopiumGain: number = 0;
  amountToken: number[] = [];

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

  getHopiumPrice() {
    return (
      Math.round(
        this.cryptoInfoList[0].current_price * this.getHopiumMultiplier() * 100
      ) / 100
    );
  }

  createRowInfo(): RowInfo {
    return {
      logoFirst: this.cryptoInfoList[0].image,
      amountToken: 0,
      cryptoFirst: this.cryptoInfoList[0].symbol.toUpperCase(),
      logoSecond: this.cryptoInfoList[1].image,
      cryptoSecond: this.cryptoInfoList[1].symbol.toUpperCase(),
      multiply: this.getHopiumMultiplier(),
      price: this.getHopiumPrice(),
      gain: 0,
    };
  }

  getGain(index: number) {
    this.tableRowList[index].gain =
      this.tableRowList[index].amountToken * this.tableRowList[index].price;
  }

  isPortfolioEmpty() {
    return this.cryptoInfoList.length === 0 ? true : false;
  }

  delete() {
    this.tableRowList = [];
  }
}
