import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CoinFullData } from 'src/app/interfaces/coin.interface';
import { SearchResponse } from 'src/app/interfaces/searchResponse.interface';
import { Coin } from '../../../interfaces/searchResponse.interface';
import { ApiCoingeckoService } from '../../services/api-coingecko.service';
import { NewRowService } from '../../services/new-row.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
  coinSelected = new FormControl('');
  filteredCoins!: Coin[];
  firstCoin!: Coin;
  secondCoin!: Coin;

  selectedFirstCryptoData!: CoinFullData;
  selectedSecondCryptoData!: CoinFullData;

  constructor(
    private coinGecko: ApiCoingeckoService,
    public _newRowService: NewRowService
  ) {}

  ngOnInit() {
    this.coinSelected.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((value) => {
          if(this.coinSelected.value === undefined){
            return this.coinGecko.searchCoin('')
          } else{
            return this.coinGecko.searchCoin(value as string)
          }
        })
      )
      .subscribe((data: SearchResponse) => {
        if (data.coins == undefined) {
          this.filteredCoins = [];
        } else {
          this.filteredCoins =
            data.coins.length > 200 ? data.coins.slice(0, 200) : data.coins;
        }
      });
  }

  displayWith(value: any) {
    return value?.name;
  }

  newRow() {
    if(this.firstCoin && this.secondCoin){
      const requestFirstCoin = this.coinGecko.getCoinData(this.firstCoin.id);

      const requestSecondCoin = this.coinGecko.getCoinData(this.secondCoin.id);

      forkJoin([requestFirstCoin, requestSecondCoin]).subscribe( response => {
        this.selectedFirstCryptoData = response[0][0];
        this.selectedSecondCryptoData = response[1][0];
        if(this.selectedFirstCryptoData && this.selectedSecondCryptoData){
          this._newRowService.newRow({
            firstCoin: this.selectedFirstCryptoData,
            secondCoin: this.selectedSecondCryptoData
          });
        }
      });
    }
  }
}
