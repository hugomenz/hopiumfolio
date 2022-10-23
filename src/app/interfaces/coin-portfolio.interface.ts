export interface CoinPortfolio {
  image: string;
  symbol: string;
  current_price: number;
  market_cap: number;
}

export interface RowInfo {
  logoFirst: string;
  cryptoFirst: string;
  logoSecond: string;
  cryptoSecond: string;
  multiply: number;
  price: number;
  gain: number;
}
