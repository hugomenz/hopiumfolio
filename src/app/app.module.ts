import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HopiumfolioModule } from './hopiumfolio/hopiumfolio.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HopiumfolioModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
