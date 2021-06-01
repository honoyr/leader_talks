
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FireAuthComponent} from './fire-auth.component';
import {FirebaseUIModule} from 'firebaseui-angular';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: FireAuthComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FirebaseUIModule.forFeature({tosUrl: 'MAIN_MODULE'}),
    RouterModule.forChild(routes)
  ],
  declarations: [FireAuthComponent]
})
export class FireAuthModule {
}
