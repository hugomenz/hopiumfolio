import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PortfolioMetrics, PortfolioMetricsService } from '../../services/portfolio-metrics.service';
import { NewRowService } from '../../services/new-row.service';
import { CurrencySelectedService } from '../../services/currency-selected.service';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss']
})
export class PortfolioSummaryComponent implements OnInit, OnDestroy {
  metrics: PortfolioMetrics = {
    totalValue: 0,
    totalChange24h: 0,
    totalChangePercent24h: 0,
    totalHoldings: 0,
    topAsset: '',
    topAssetValue: 0,
    lastUpdated: new Date(),
  };

  private destroy$ = new Subject<void>();

  constructor(
    private portfolioMetricsService: PortfolioMetricsService,
    public newRowService: NewRowService,
    public currencySelected: CurrencySelectedService
  ) { }

  ngOnInit(): void {
    // Subscribe to portfolio metrics
    this.portfolioMetricsService.getMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        this.metrics = metrics;
      });

    // Subscribe to portfolio data changes
    this.newRowService.getRows()
      .pipe(takeUntil(this.destroy$))
      .subscribe(rows => {
        this.portfolioMetricsService.updateMetrics(rows);
      });

    // Initial calculation
    if (!this.newRowService.isEmpty) {
      this.portfolioMetricsService.updateMetrics(this.newRowService.tableRowList);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isPositiveChange(): boolean {
    return this.metrics.totalChange24h >= 0;
  }

  get changeIcon(): string {
    return this.isPositiveChange ? 'trending_up' : 'trending_down';
  }

  get changeClass(): string {
    return this.isPositiveChange ? 'status-positive' : 'status-negative';
  }
}
