
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppContentManagerService} from "./services/app-content-manager.service";
import {AppPhoneNumbersManagerService} from "./services/app-phone-numbers-manager.service";
import {PhoneNumberPipe} from "./app-pipe";


@NgModule({
  declarations: [
    PhoneNumberPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AppContentManagerService,
    AppPhoneNumbersManagerService
  ],
  exports: [
    PhoneNumberPipe
  ]
})
export class AppShareModule { }
