import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {B2cHomePageModule} from "./pages/b2c-home-page/b2c-home-page.module";
import {PhoneNumbersPageModule} from "./pages/phone-nunmbers-page/phone-nunmbers-page.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'b2c',
    pathMatch: 'full'
  },
  {
    path: 'b2c',
    children: [
      {
        path: '',
        loadChildren: () => B2cHomePageModule
      },
      {
        path: 'phone-numbers',
        loadChildren: () => PhoneNumbersPageModule
      }
    ]
  },
  {
    path: 'b2b',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
