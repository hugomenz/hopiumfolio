import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HopiumRoutingModule } from './hopiumfolio-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { HopiumfolioComponent } from './hopiumfolio.component';
@NgModule({
  declarations: [SearchComponent, HopiumfolioComponent, TableComponent],
  imports: [CommonModule, HopiumRoutingModule, FormsModule],
})
export class HopiumfolioModule {}
