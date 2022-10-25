import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
