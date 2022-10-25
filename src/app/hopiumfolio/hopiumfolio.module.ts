import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { HopiumfolioComponent } from './hopiumfolio.component';
import { HopiumRoutingModule } from './hopiumfolio-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { ConfigComponent } from './components/config/config.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    SearchComponent,
    TableComponent,
    HopiumfolioComponent,
    ConfigComponent,
    PortfolioComponent,
  ],
  imports: [CommonModule, HopiumRoutingModule, AngularMaterialModule],
})
export class HopiumfolioModule {}
