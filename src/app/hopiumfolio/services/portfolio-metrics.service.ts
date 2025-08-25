import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';

export interface PortfolioMetrics {
  totalValue: number;
  totalChange24h: number;
  totalChangePercent24h: number;
  totalHoldings: number;
  topAsset: string;
  topAssetValue: number;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioMetricsService {
  private metricsSubject = new BehaviorSubject<PortfolioMetrics>({
    totalValue: 0,
    totalChange24h: 0,
    totalChangePercent24h: 0,
    totalHoldings: 0,
    topAsset: '',
    topAssetValue: 0,
    lastUpdated: new Date(),
  });

  constructor() {}

  getMetrics(): Observable<PortfolioMetrics> {
    return this.metricsSubject.asObservable();
  }

  calculateMetrics(portfolioData: RowInfo[]): PortfolioMetrics {
    if (!portfolioData || portfolioData.length === 0) {
      return {
        totalValue: 0,
        totalChange24h: 0,
        totalChangePercent24h: 0,
        totalHoldings: 0,
        topAsset: '',
        topAssetValue: 0,
        lastUpdated: new Date(),
      };
    }

    const totalValue = portfolioData.reduce((sum, item) => sum + item.gain, 0);
    const totalHoldings = portfolioData.length;

    // Find top asset by value
    const topAssetEntry = portfolioData.reduce((max, item) =>
      item.gain > max.gain ? item : max
    );

    // For now, we'll simulate 24h changes (in a real app, this would come from API)
    const simulatedChange24h = totalValue * (Math.random() * 0.2 - 0.1); // -10% to +10%
    const changePercent24h = totalValue > 0 ? (simulatedChange24h / totalValue) * 100 : 0;

    const metrics: PortfolioMetrics = {
      totalValue,
      totalChange24h: simulatedChange24h,
      totalChangePercent24h: changePercent24h,
      totalHoldings,
      topAsset: topAssetEntry ? topAssetEntry.cryptoFirst.toUpperCase() : '',
      topAssetValue: topAssetEntry ? topAssetEntry.gain : 0,
      lastUpdated: new Date(),
    };

    this.metricsSubject.next(metrics);
    return metrics;
  }

  updateMetrics(portfolioData: RowInfo[]): void {
    this.calculateMetrics(portfolioData);
  }
}