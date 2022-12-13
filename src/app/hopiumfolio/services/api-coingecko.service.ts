import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from 'src/app/interfaces/searchResponse.interface';
import { CoinFullData } from '../../interfaces/coin.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiCoingeckoService {
  constructor(private http: HttpClient) {}

  getCoins(currency: string) {
    //console.log(`getCoins - currency: ${currency}`);
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    return this.http.get<CoinFullData[]>(apiUrl);
  }

  searchCoin(search: string) {
    //console.log(search + 'no funciona');
    const searchUrl = 'https://api.coingecko.com/api/v3/search?query=';
    return this.http.get<SearchResponse>(searchUrl + search);
  }

  getCoinData(currency: string, id: string) {
    //console.log(`getCoinData - currency: ${currency}`);
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=gecko_desc&per_page=10&page=1&sparkline=false`;
    return this.http.get<CoinFullData[]>(apiUrl);
  }

  getCurrencyList() {
    //console.log('getCurrencyList!');
    const apiUrl =
      'https://api.coingecko.com/api/v3/simple/supported_vs_currencies';
    return this.http.get<string[]>(apiUrl);
  }
}
