import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencySelectedService {
  private currencySubject = new BehaviorSubject<string>('usd');
  private previousCurrencySubject = new BehaviorSubject<string>('');

  constructor() {
    // Load saved currency from localStorage
    const savedCurrency = localStorage.getItem('hopium-currency');
    if (savedCurrency) {
      this.currencySubject.next(savedCurrency);
    }
  }

  get currencySelected(): string {
    return this.currencySubject.value;
  }

  set currencySelected(currency: string) {
    this.updateCurrency(currency);
  }

  get previousCurrency(): string {
    return this.previousCurrencySubject.value;
  }

  set previousCurrency(currency: string) {
    this.previousCurrencySubject.next(currency);
  }

  getCurrency(): Observable<string> {
    return this.currencySubject.asObservable();
  }

  updateCurrency(curr: string): void {
    this.previousCurrencySubject.next(this.currencySubject.value);
    this.currencySubject.next(curr);
    
    // Save to localStorage
    localStorage.setItem('hopium-currency', curr);
  }

  getSupportedCurrencies(): string[] {
    return [
      'usd', 'eur', 'jpy', 'gbp', 'aud', 'cad', 'chf', 'cny', 'sek', 'nzd',
      'mxn', 'sgd', 'hkd', 'nok', 'krw', 'try', 'rub', 'inr', 'brl', 'zar'
    ];
  }

  getCurrencySymbol(currency: string): string {
    const symbols: { [key: string]: string } = {
      'usd': '$',
      'eur': '€',
      'jpy': '¥',
      'gbp': '£',
      'aud': 'A$',
      'cad': 'C$',
      'chf': 'CHF',
      'cny': '¥',
      'sek': 'kr',
      'nzd': 'NZ$',
      'mxn': '$',
      'sgd': 'S$',
      'hkd': 'HK$',
      'nok': 'kr',
      'krw': '₩',
      'try': '₺',
      'rub': '₽',
      'inr': '₹',
      'brl': 'R$',
      'zar': 'R'
    };
    return symbols[currency.toLowerCase()] || currency.toUpperCase();
  }

  getCurrencyName(currency: string): string {
    const names: { [key: string]: string } = {
      'usd': 'US Dollar',
      'eur': 'Euro',
      'jpy': 'Japanese Yen',
      'gbp': 'British Pound',
      'aud': 'Australian Dollar',
      'cad': 'Canadian Dollar',
      'chf': 'Swiss Franc',
      'cny': 'Chinese Yuan',
      'sek': 'Swedish Krona',
      'nzd': 'New Zealand Dollar',
      'mxn': 'Mexican Peso',
      'sgd': 'Singapore Dollar',
      'hkd': 'Hong Kong Dollar',
      'nok': 'Norwegian Krone',
      'krw': 'South Korean Won',
      'try': 'Turkish Lira',
      'rub': 'Russian Ruble',
      'inr': 'Indian Rupee',
      'brl': 'Brazilian Real',
      'zar': 'South African Rand'
    };
    return names[currency.toLowerCase()] || currency.toUpperCase();
  }
}
