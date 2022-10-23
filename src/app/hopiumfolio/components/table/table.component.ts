import { Component, Input, OnInit } from '@angular/core';
import { CoinPortfolio } from 'src/app/interfaces/coin-portfolio.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataCurr1!: CoinPortfolio;
  @Input() dataCurr2!: CoinPortfolio;

  dataFromSearch!: CoinPortfolio[];

  constructor() {}

  ngOnInit(): void {}

  delete(index: number) {
    this.dataFromSearch.splice(index, 1);
  }
}

// crear interfaz row
