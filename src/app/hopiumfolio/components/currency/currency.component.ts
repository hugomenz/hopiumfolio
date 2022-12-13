import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiCoingeckoService } from '../../services/api-coingecko.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import * as _ from 'lodash';

import { CurrencySelectedService } from '../../services/currency-selected.service';
import { NewRowService } from '../../services/new-row.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  currencySelected = new FormControl('usd');

  currency!: string;
  currencyList!: string[];
  filteredCurrency!: Observable<any[]>;

  constructor(
    private _coinGecko: ApiCoingeckoService,
    public _currencySelected: CurrencySelectedService,
    private _newRowService: NewRowService
  ) {}

  ngOnInit() {
    this._coinGecko.getCurrencyList().subscribe((data) => {
      //console.log(data);
      this.currencyList = _.values(data);
      this.filteredCurrency = this.currencySelected.valueChanges.pipe(
        startWith(''),
        map((curr) =>
          curr ? this.filterCurrencyList(curr) : this.currencyList.slice()
        )
      );
    });
  }

  getCurrencyList() {}

  filterCurrencyList(name: string) {
    return this.currencyList.filter(
      (curr) => curr.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  displayWith(value: string) {
    if (value !== undefined) {
      return value.toUpperCase();
    } else {
      return value;
    }
  }

  refreshRow() {
    // We refresh the table only if the conditions are met
    // 1. tableRowList is NOT empty (there is at least one element in the table)
    // 2. the previous currency is updated
    // 3. previous and current currency must not match
    if (
      !this._newRowService.isEmpty &&
      this._currencySelected.previousCurrency !== '' &&
      this._currencySelected.previousCurrency !==
        this._currencySelected.currencySelected
    ) {
      // get firstCoinID and secondCoinID from the row object
      let firstCoinID = this._newRowService.tableRowList[0].cryptoFirst;
      let secondCoinID = this._newRowService.tableRowList[0].cryptoSecond;

      const requestFirstCoin = this._coinGecko.getCoinData(
        this._currencySelected.currencySelected,
        firstCoinID
      );

      const requestSecondCoin = this._coinGecko.getCoinData(
        this._currencySelected.currencySelected,
        secondCoinID
      );

      forkJoin([requestFirstCoin, requestSecondCoin]).subscribe((response) => {
        let selectedFirstCryptoData = response[0][0];
        let selectedSecondCryptoData = response[1][0];
        if (selectedFirstCryptoData && selectedSecondCryptoData) {
          this._newRowService.newRow({
            firstCoin: selectedFirstCryptoData,
            secondCoin: selectedSecondCryptoData,
          });
        }
      });
    }

    // get array length too as rowInfoListLen
    let rowInfoListLen = (<any>this._newRowService.tableRowList[0]).length;

    // delete the first elements of the rowInfoList till the
    // (rowInfoListLen - 1)
    // table is updated
  }
}
