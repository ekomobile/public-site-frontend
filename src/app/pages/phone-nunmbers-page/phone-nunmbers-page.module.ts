import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchNumbersComponent } from './search-numbers/search-numbers.component';
import {AppShareModule} from "../../app-share.module";
import {RouterModule} from "@angular/router";
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [
    SearchNumbersComponent,
  ],
    imports: [
        CommonModule,
        AppShareModule,
        RouterModule.forChild([
            {
                path: '',
                component: SearchNumbersComponent
            }
        ])
    ]
})
export class PhoneNumbersPageModule { }
