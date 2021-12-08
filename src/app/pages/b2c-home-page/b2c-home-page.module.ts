import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {AppShareModule} from "../../app-share.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    AppShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ])
  ]
})
export class B2cHomePageModule { }
