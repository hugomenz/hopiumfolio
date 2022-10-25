import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './components/config/config.component';
import { HopiumfolioComponent } from './hopiumfolio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HopiumfolioComponent },
      //{ path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HopiumRoutingModule {}
