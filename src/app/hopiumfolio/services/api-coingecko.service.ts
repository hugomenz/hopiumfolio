import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from 'src/app/interfaces/searchResponse.interface';
import { CoinFullData } from '../../interfaces/coin.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiCoingeckoService {
  constructor(private http: HttpClient) {}

  getCoins() {
    const apiUrl =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    return this.http.get<CoinFullData[]>(apiUrl);
  }

  searchCoin(search: string) {
    const searchUrl = 'https://api.coingecko.com/api/v3/search?query=';
    return this.http.get<SearchResponse>(searchUrl + search);
  }

  getCoinData(id: string) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=gecko_desc&per_page=10&page=1&sparkline=false`;
    return this.http.get<CoinFullData[]>(apiUrl);
  }
}
