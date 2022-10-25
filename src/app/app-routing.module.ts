import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './hopiumfolio/components/config/config.component';
import { PortfolioComponent } from './hopiumfolio/components/portfolio/portfolio.component';
import { HopiumRoutingModule } from './hopiumfolio/hopiumfolio-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./hopiumfolio/hopiumfolio.module').then(
        (m) => m.HopiumfolioModule
      ),
  },
  {
    path: 'config',
    component: ConfigComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HopiumRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
