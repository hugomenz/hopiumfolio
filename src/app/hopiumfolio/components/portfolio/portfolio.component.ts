import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { NewRowService } from '../../services/new-row.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(
    public _portfolioData: PortfolioDataService,
    public _newRowService: NewRowService
  ) {}

  ngOnInit(): void {
    // Update chart data when component loads
    if (!this._newRowService.isEmpty) {
      this._portfolioData.updateChartData(this._newRowService.tableRowList);
    }
  }
}
