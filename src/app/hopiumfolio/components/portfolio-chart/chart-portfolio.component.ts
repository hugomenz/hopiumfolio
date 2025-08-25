import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { NewRowService } from '../../services/new-row.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';
import { Color, ScaleType } from '@swimlane/ngx-charts';

type WeightData = {
  name: string;
  value: number;
};

@Component({
  selector: 'chart-portfolio',
  templateUrl: './chart-portfolio.component.html',
})
export class ChartPortfolioComponent implements OnInit, OnDestroy {
  view: [number, number] = [800, 500];
  chartData: WeightData[] = [];
  private destroy$ = new Subject<void>();

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  isExplodeSlices: boolean = true;
  maxLabelLength: number = 10;

  // Hopium-themed color palette
  paletteHopium = [
    '#9d00ff',  // Primary hopium purple
    '#6393ff',  // Accent blue
    '#7393ff',  // Light blue
    '#53ebe4',  // Cyan
    '#ff3333',  // Red
    '#33ffff',  // Bright cyan
    '#FF9F1C',  // Orange
    '#97CC04',  // Green
    '#ff33ff',  // Magenta
  ];

  public legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'Hopium Portfolio',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.paletteHopium,
  };

  constructor(
    public portfolioDataService: PortfolioDataService,
    private newRowService: NewRowService
  ) {}

  ngOnInit(): void {
    // Subscribe to chart data changes
    this.portfolioDataService.getChartData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.chartData = data;
      });

    // Subscribe to portfolio changes and update chart
    this.newRowService.getRows()
      .pipe(takeUntil(this.destroy$))
      .subscribe(rows => {
        this.portfolioDataService.updateChartData(rows);
      });

    // Initial data load
    if (!this.newRowService.isEmpty) {
      this.portfolioDataService.updateChartData(this.newRowService.tableRowList);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  get hasData(): boolean {
    return this.chartData && this.chartData.length > 0;
  }
}
