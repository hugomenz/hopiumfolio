import { Component, OnInit } from '@angular/core';
import { dataFromSearch } from '../../api/example.search-data';
import { ApiCoingeckoService } from '../../services/api-coingecko.service';
import { NewRowService } from '../../services/new-row.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private apiCoingecko: ApiCoingeckoService,
    private searchData: NewRowService //borrar y
  ) {
    this.apiCoingecko
      .searchCoin('bit')
      .subscribe((data) => console.log(data.coins));
  }

  newRow() {
    this.searchData.newRow(dataFromSearch); // lista con los DOS obejtos de los inputs
  }

  ngOnInit(): void {}
}
