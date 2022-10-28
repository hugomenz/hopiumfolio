import { Injectable } from '@angular/core';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';
type WeightData = {
  name: string;
  value: number;
};
@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  chartDataList: WeightData[] = [];
  constructor() {}

  getDataChartList(tableRowList: RowInfo[]) {
    tableRowList.map(({ cryptoFirst, gain }) => {
      this.chartDataList.push({
        name: cryptoFirst,
        value: this.getPortfolioWeight(tableRowList, gain),
      });
    });
  }

  getPortfolioWeight(tableRowList: RowInfo[], gain: number) {
    let totalPortfolioValue = tableRowList.reduce<number>(
      (accumulator, obj) => {
        return accumulator + obj.gain;
      },
      0
    );

    return (gain / totalPortfolioValue) * 100;

    // weight = posValue / totalPortfolioValue
  }
}
