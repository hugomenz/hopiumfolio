import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NewRowService } from '../../services/new-row.service';
import { RowInfo } from '../../../interfaces/coin-portfolio.interface';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencySelectedService } from '../../services/currency-selected.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns = [
    'logoFirst',
    'amountToken',
    'cryptoFirst',
    'logoSecond',
    'cryptoSecond',
    'multiply',
    'price',
    'gain',
    'delete',
  ];

  tableDataSource!: any;
  tableRowList: RowInfo[] = [];
  givenTokenAmount = new FormControl('');

  constructor(
    public _newRowService: NewRowService,
    public _currencySelected: CurrencySelectedService
  ) {
    if (this._newRowService.isEmpty == false) {
      this.tableDataSource = new MatTableDataSource<RowInfo>(
        this._newRowService.tableRowList
      );
    }
  }

  ngOnInit(): void {
    this._newRowService.getRows().subscribe((rows) => {
      this.tableDataSource = new MatTableDataSource<RowInfo>(rows);
    });
  }
}
