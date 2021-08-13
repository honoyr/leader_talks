import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
    NbButtonModule,
    NbMenuModule,
    NbCardModule,
    NbListModule,
    NbSpinnerModule,
    NbUserModule,
    NbTabsetModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule
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
import {UserService} from "./service/users.service";
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { InputFileDropComponent } from './input-file-drop/input-file-drop.component';


import {
  TUI_SANITIZER,
  TuiAutoFocusModule,
  TuiElementModule,
  TuiFilterPipeModule,
  TuiLetModule,
  TuiMapperPipeModule,
  TuiMediaModule,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownControllerModule,
  TuiDropdownModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiFormatNumberPipeModule,
  TuiFormatPhonePipeModule,
  TuiGroupModule,
  TuiHintControllerModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiManualHintModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiNotificationsModule,
  TuiPointerHintModule,
  TuiPrimitiveCheckboxModule,
  TuiPrimitiveTextfieldModule,
  TuiRootModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiSvgService,
  TuiTextfieldControllerModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiActionModule,
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiBadgeModule,
  TuiBreadcrumbsModule,
  TuiCalendarMonthModule,
  TuiCalendarRangeModule,
  TuiCheckboxBlockModule,
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiDropdownSelectionModule,
  TuiFieldErrorModule,
  TuiFilterModule,
  TuiHighlightModule,
  TuiInputCopyModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputDateTimeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputModule,
  TuiInputMonthModule,
  TuiInputMonthRangeModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiInputRangeModule,
  TuiInputSliderModule,
  TuiInputTagModule,
  TuiInputTimeModule,
  TuiIslandModule,
  TuiLazyLoadingModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
  TuiPaginationModule,
  TuiPresentModule,
  TuiProjectClassModule,
  TuiFilterByInputPipeModule,
  TuiRadioBlockModule,
  TuiRadioLabeledModule,
  TuiRadioListModule,
  TuiRadioModule,
  TuiSelectModule,
  TuiSliderModule,
  TuiStepperModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import {ParticipantComponent} from "./add-participant/components/participant.component";
import { UserListComponent } from './user-list/user-list.component';

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
    UserService,
    AddParticipantComponent,
    AdminPageComponent,
    InputFileDropComponent,
    ParticipantComponent,
    UserListComponent,

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
    NbUserModule,
    NbTabsetModule,
    NbDialogModule.forRoot(),
    NbIconModule,
    NbInputModule,

    TuiInputFileModule,
    ReactiveFormsModule,
    TuiRootModule,
    //
    TuiDialogModule,
    TuiNotificationsModule,
    // Modules for your app modules where you use our components
    TuiAccordionModule,
    TuiActionModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiCalendarRangeModule,
    TuiCalendarMonthModule,
    // TuiCardModule,
    // TuiAxesModule,
    // TuiLineChartModule,
    // TuiLineDaysChartModule,
    // TuiPieChartModule,
    // TuiBarChartModule,
    // TuiRingChartModule,
    TuiCheckboxModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiPrimitiveCheckboxModule,
    // TuiColorPickerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiHostedDropdownModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiExpandModule,
    TuiFilterModule,
    TuiGroupModule,
    TuiMarkerIconModule,
    TuiInputInlineModule,
    TuiInputModule,
    TuiInputDateModule,
    // TuiInputCardModule,
    // TuiInputCVCModule,
    // TuiInputExpireModule,
    TuiInputCopyModule,
    TuiInputCountModule,
    TuiInputDateTimeModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputDateRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiInputPhoneInternationalModule,
    TuiPrimitiveTextfieldModule,
    TuiTextAreaModule,
    TuiIslandModule,
    TuiLabelModule,
    TuiLineClampModule,
    TuiLinkModule,
    TuiLoaderModule,
    // TuiMoneyModule,
    TuiNotificationModule,
    // TuiMobileDialogModule,
    // TuiMobileCalendarModule,
    // TuiPullToRefreshModule,
    TuiRadioModule,
    TuiRadioBlockModule,
    TuiRadioLabeledModule,
    TuiRadioListModule,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiScrollbarModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiSliderModule,
    TuiSvgModule,
    // TuiReorderModule,
    // TuiResizableColumnModule,
    // TuiTablePaginationModule,
    TuiTagModule,
    TuiToggleModule,
    TuiTooltipModule,
    TuiBreadcrumbsModule,
    TuiPaginationModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiAutoFocusModule,
    TuiDropdownModule,
    TuiDropdownSelectionModule,
    // TuiElasticStickyModule,
    TuiElementModule,
    TuiHighlightModule,
    TuiHintModule,
    TuiLazyLoadingModule,
    TuiManualHintModule,
    TuiPointerHintModule,
    TuiLetModule,
    TuiMediaModule,
    TuiModeModule,
    TuiPresentModule,
    // TuiRippleModule,
    // TuiSidebarModule,
    TuiDropdownControllerModule,
    // TuiTouchableModule,
    TuiHintControllerModule,
    TuiTextfieldControllerModule,
    // TuiMoneyModule,
    // PolymorpheusModule,
    TuiFilterPipeModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiMapperPipeModule,
    // TuiTableModule,
    // TuiBarModule,
    // TuiCurrencyPipeModule,
    TuiProjectClassModule,
    TuiFilterByInputPipeModule,
  ],
  providers: [{ provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined },],
  bootstrap: [AppComponent]
})
export class AppModule { }
