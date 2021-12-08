import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {AppContentManagerService} from "./services/app-content-manager.service";
import {AppPhoneNumbersManagerService} from "./services/app-phone-numbers-manager.service";
import {AppShareModule} from "./app-share.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppShareModule,
    HttpClientModule
  ],
  providers: [
    AppContentManagerService,
    AppPhoneNumbersManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
