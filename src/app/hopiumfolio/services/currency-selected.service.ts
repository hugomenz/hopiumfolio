import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencySelectedService {
  constructor() {}

  currencySelected: string = 'usd';
  previousCurrency: string = '';

  updateCurrency(curr: string) {
    this.previousCurrency = this.currencySelected;
    this.currencySelected = curr;
  }
}
