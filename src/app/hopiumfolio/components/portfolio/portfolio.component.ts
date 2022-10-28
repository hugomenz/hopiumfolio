import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(public _portfolioData: PortfolioDataService) {}

  ngOnInit(): void {
    /*   this._portfolioData.chartDataList = [
      { name: 'ADA', value: 32 },
      { name: 'COTI', value: 16 },
      { name: 'WMT', value: 15 },
      { name: 'BTC', value: 21 },
      { name: 'ERG', value: 12 },
    ]; */
  }
}
