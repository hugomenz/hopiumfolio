import { Component, Input, OnInit } from '@angular/core';
import { CoinPortfolio } from 'src/app/interfaces/coin-portfolio.interface';
import { NewRowService } from '../../services/new-row.service';
import { dataFromSearch } from '../../api/example.search-data';
import { getHopiumMultiplier } from '../../utils/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  isEmptyPortfolio: boolean = true;
  tokenAmount!: number;
  hopiumGains!: number;

  constructor(public searchData: NewRowService) {}

  ngOnInit(): void {}

  delete() {
    this.searchData.portfolioRow = [];
  }
}

// crear interfaz row
