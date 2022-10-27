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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewChecked {
  givenTokenAmount = new FormControl('');

  constructor(
    public searchData: NewRowService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
