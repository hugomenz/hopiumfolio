import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { HopiumfolioComponent } from './hopiumfolio.component';
import { HopiumRoutingModule } from './hopiumfolio-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { ConfigComponent } from './components/config/config.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { HeaderComponent } from './layout/header/header.component';
import { ChartPortfolioComponent } from './components/portfolio-chart/chart-portfolio.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
  declarations: [
    SearchComponent,
    TableComponent,
    HopiumfolioComponent,
    ConfigComponent,
    PortfolioComponent,
    HeaderComponent,
    ChartPortfolioComponent,
    CurrencyComponent,
  ],
  imports: [
    CommonModule,
    HopiumRoutingModule,
    AngularMaterialModule,
    NgxChartsModule,
  ],
})
export class HopiumfolioModule {}
