import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SearchResponse } from 'src/app/interfaces/searchResponse.interface';
import { Coin } from '../../../interfaces/searchResponse.interface';
import { ApiCoingeckoService } from '../../services/api-coingecko.service';
import { NewRowService } from '../../services/new-row.service';

import { dataFromSearch } from '../../api/example.search-data';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
  coinSelected = new FormControl('');
  filteredCoins!: Coin[];
  firstCoin!: Coin;
  secondCoin!: Coin;

  constructor(
    private coinGecko: ApiCoingeckoService,
    public searchData: NewRowService
  ) {
    this.coinGecko
      .searchCoin('')
      .subscribe((data) => (this.filteredCoins = data.coins.slice(0, 200)));
  }

  ngOnInit() {
    this.coinSelected.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((value) => this.coinGecko.searchCoin(value as string))
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
    this.searchData.newRow(dataFromSearch); // lista con los DOS obejtos de los inputs
  }
}
