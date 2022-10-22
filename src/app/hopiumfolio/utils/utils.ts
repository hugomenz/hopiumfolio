import { Coin } from 'src/app/interfaces/coin.interface';

export const getHopiumMultiplier = (curr1: Coin, curr2: Coin) => {
  return curr1.market_cap / curr2.market_cap;
};
