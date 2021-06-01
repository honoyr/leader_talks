import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthpageComponent} from './authpage.component';
import {RouterModule, Routes} from '@angular/router';
import {firebase, FirebaseUIModule} from 'firebaseui-angular';

const routes: Routes = [
  {path: '', component: AuthpageComponent},
];


@NgModule({
  imports: [
    CommonModule,
    FirebaseUIModule.forFeature({
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [AuthpageComponent]
})
export class AuthpageModuleModule {
}
