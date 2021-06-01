import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FireAuthModule} from "./fire-auth/fire-auth.module";

const routes: Routes = [
  {path: 'page', loadChildren: () => import('./authpage/authpage.module').then(m => m.AuthpageModuleModule)},
  {path: '', loadChildren: () => import('./fire-auth/fire-auth.module').then(m => m.FireAuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
