import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  portfolioSrc = 'assets/img/portfolio-icon.png';
  configSrc = 'assets/img/config-icon.png';

  constructor() {}

  ngOnInit(): void {}
}
