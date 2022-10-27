import {
  ChangeDetectionStrategy,
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
export class TableComponent implements OnInit {
  givenTokenAmount = new FormControl('');

  constructor(public searchData: NewRowService) {}

  ngOnInit(): void {}
}
