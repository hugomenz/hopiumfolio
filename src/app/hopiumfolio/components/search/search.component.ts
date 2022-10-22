import { Component, OnInit } from '@angular/core';
import { ApiCoingeckoService } from '../../services/api-coingecko.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor( private apiCoingecko: ApiCoingeckoService) {
    this.apiCoingecko.searchCoin('bit').subscribe(data => console.log(data.coins));
   }

  ngOnInit(): void {
  }

}
