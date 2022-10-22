import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { HopiumfolioComponent } from './hopiumfolio.component';
import { HopiumRoutingModule } from './hopiumfolio-routing.module';

@NgModule({
  declarations: [SearchComponent, TableComponent, HopiumfolioComponent],
  imports: [CommonModule, HopiumRoutingModule],
})
export class HopiumfolioModule {}
