import { Component, OnInit } from '@angular/core';
import { NewRowService } from '../../services/new-row.service';
import { PortfolioDataService } from '../../services/portfolio-data.service';
interface ImgSrc {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  portfolio: ImgSrc = {
    src: 'assets/img/portfolio-icon.png',
    alt: 'Port',
  };

  config: ImgSrc = {
    src: 'assets/img/config-icon.png',
    alt: 'Conf',
  };

  mainLogo: ImgSrc = {
    src: 'assets/img/logo-main.jpg',
    alt: 'Conf',
  };

  constructor(
    public _newRowData: NewRowService,
    public _portfolioData: PortfolioDataService
  ) {}

  ngOnInit(): void {}
}
