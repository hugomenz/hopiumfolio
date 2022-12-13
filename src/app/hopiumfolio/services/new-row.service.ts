import { Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exchange } from 'src/app/interfaces/searchResponse.interface';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';
import { CoinFullData } from 'src/app/interfaces/coin.interface';
import { newRowResponse } from '../../interfaces/coin.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewRowService implements OnInit {
  tableRowList: RowInfo[] = JSON.parse(
    localStorage.getItem('portfolio') || '[]'
  );

  tableRowList$: Subject<RowInfo[]> = new Subject();

  isEmpty: boolean = true;
  idCounter: number = 0;

  hopiumMultiply!: number;
  hopiumPrice!: number;
  //hopiumGain: number = 0;
  amountToken: number[] = [];

  constructor() {
    if (this.tableRowList.length != 0) {
      this.isEmpty = false;
      this.tableRowList$.next(this.tableRowList);
      console.log(this.tableRowList);
    }
  }

  ngOnInit(): void {}

  public newRow(dataFromSearch: newRowResponse): void {
    this.isEmpty = false;

    // if table is not empty in localstorage should get last id
    if (this.tableRowList.length != 0) {
      this.idCounter = this.tableRowList[this.tableRowList.length - 1].id + 1;
    } else {
      this.idCounter += 1;
    }

    this.tableRowList.push(this.mapNewRow(dataFromSearch));

    localStorage.setItem('portfolio', JSON.stringify(this.tableRowList));

    this.tableRowList$.next(this.tableRowList);
    console.log(
      '%cnew-row.service.ts line:32 object',
      'color: #007acc;',
      this.tableRowList
    );
  }

  public getRows() {
    return this.tableRowList$.asObservable();
  }

  public delete(id: number) {
    this.tableRowList = this.tableRowList.filter((row) => row.id !== id);

    localStorage.setItem('portfolio', JSON.stringify(this.tableRowList)); // update localstorage state

    this.tableRowList$.next(this.tableRowList);

    if (this.tableRowList.length == 0) {
      this.isEmpty = true;
    }
  }

  private mapNewRow(data: newRowResponse): RowInfo {
    const firstCoin = data.firstCoin;
    const secondCoin = data.secondCoin;
    const rowInfo = {
      id: this.idCounter,
      logoFirst: firstCoin.image,
      amountToken: 0,
      cryptoFirst: firstCoin.symbol.toUpperCase(),
      logoSecond: secondCoin.image,
      cryptoSecond: secondCoin.symbol.toUpperCase(),
      multiply: this.getHopiumMultiplier(firstCoin, secondCoin),
      price: this.getHopiumPrice(firstCoin, secondCoin),
      gain: 0,
    };
    return rowInfo;
  }

  public getGain(index: number) {
    this.tableRowList[index].gain =
      this.tableRowList[index].amountToken * this.tableRowList[index].price;

    localStorage.setItem('portfolio', JSON.stringify(this.tableRowList)); // update localstorage state
  }

  private getHopiumPrice(first: CoinFullData, second: CoinFullData) {
    return (
      Math.round(
        first.current_price * this.getHopiumMultiplier(first, second) * 100
      ) / 100
    );
  }

  private getHopiumMultiplier(first: CoinFullData, second: CoinFullData) {
    return Math.round((second.market_cap / first.market_cap) * 100) / 100;
  }
}
