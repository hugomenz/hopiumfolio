import { Component, Input, OnInit } from '@angular/core';
import { NewRowService } from '../../services/new-row.service';

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
}
