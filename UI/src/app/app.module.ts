import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAnalyticsModule} from "@angular/fire/analytics";


import { environment } from '../environments/environment';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { FireAuthComponent } from './fire-auth/fire-auth.component';
import { AuthpageComponent } from './authpage/authpage.component';
import { HomePageComponent } from './home-page/home-page.component';

import {
  NbThemeModule,
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule, NbMenuModule, NbCardModule, NbListModule, NbSpinnerModule
} from '@nebular/theme';
// import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component'; // we also need angular router for Nebular to function properly

// icons
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './banner/banner.component';
import { UserboardComponent } from './userboard/userboard.component';
import { UserCardComponent } from './user-card/user-card.component';
import {NewsPostPlaceholderComponent} from "./userboard/components/news-post-placeholder.component";
import {NewsPostComponent} from "./userboard/components/news-post.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NewsService} from "./userboard/news.service";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ErrorComponent,
    MenuComponent,
    BannerComponent,
    UserboardComponent,
    UserCardComponent,
    NewsPostPlaceholderComponent,
    NewsPostComponent,
    // NewsService,

    // FireAuthComponent,
    // AuthpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseAuth),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NbEvaIconsModule,
    NbThemeModule.forRoot(),
    // RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    NbThemeModule.forRoot({name: 'default'}),
    BrowserAnimationsModule,
    NbListModule,
    NbSpinnerModule,
    CommonModule,
    HttpClientModule,

  ],
  providers: [{ provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined },],
  bootstrap: [AppComponent]
})
export class AppModule { }
