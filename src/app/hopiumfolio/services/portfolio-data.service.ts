import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';

type WeightData = {
  name: string;
  value: number;
};

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  private chartDataSubject = new BehaviorSubject<WeightData[]>([]);
  chartDataList: WeightData[] = [];

  constructor() {}

  getChartData(): Observable<WeightData[]> {
    return this.chartDataSubject.asObservable();
  }

  getDataChartList(tableRowList: RowInfo[]) {
    this.chartDataList = [];
    if (tableRowList && tableRowList.length > 0) {
      tableRowList.forEach(({ cryptoFirst, gain }) => {
        if (gain > 0) {
          this.chartDataList.push({
            name: cryptoFirst.toUpperCase(),
            value: this.getPortfolioWeight(tableRowList, gain),
          });
        }
      });
    }
    this.chartDataSubject.next(this.chartDataList);
  }

  getPortfolioWeight(tableRowList: RowInfo[], gain: number): number {
    const totalPortfolioValue = tableRowList.reduce<number>(
      (accumulator, obj) => {
        return accumulator + (obj.gain || 0);
      },
      0
    );

    if (totalPortfolioValue === 0) return 0;
    return (gain / totalPortfolioValue) * 100;
  }

  updateChartData(tableRowList: RowInfo[]): void {
    this.getDataChartList(tableRowList);
  }
}
