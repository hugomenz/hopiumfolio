import { Component } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { RowInfo } from 'src/app/interfaces/coin-portfolio.interface';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'chart-portfolio',
  templateUrl: './chart-portfolio.component.html',
})
export class ChartPortfolioComponent {
  view: [number, number] = [800, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  isExplodeSlices: boolean = true;
  maxLabelLength: number = 10; // max 10

  // palette testing
  paletteCyberpunk = [
    '#53ebe4',
    '#0f9595',
    '#084f64',
    '#03274c',
    '#08173d',
    '#4d004f',
    '#c1115a',
    '#e13a6a',
    '#eca6c0',
  ];

  paletteNeon = [
    '#ff3333',
    '#33ffff',
    '#33ccff',
    '#0000ff',
    '#cc33ff',
    '#ff33ff',
    '#FF9F1C',
    '#3B1F2B',
    '#97CC04',
  ];

  public legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'Portfolio Display',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.paletteNeon,
  };

  constructor(public _portfolioData: PortfolioDataService) {}

  onSelect(data: RowInfo[]): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: RowInfo[]): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: RowInfo[]): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
