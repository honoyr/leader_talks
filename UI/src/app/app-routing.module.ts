import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FireAuthModule} from "./fire-auth/fire-auth.module";
import {HomePageComponent} from "./home-page/home-page.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  {path: 'page', loadChildren: () => import('./authpage/authpage.module').then(m => m.AuthpageModuleModule)},
  {path: 'auth', loadChildren: () => import('./fire-auth/fire-auth.module').then(m => m.FireAuthModule)},
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
