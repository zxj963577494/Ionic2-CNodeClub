import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePage, HomeAddPage, HomeDetailPage } from '../pages/home/';
import { LoginPage } from '../pages/login/';
import { AccountPage, AccountCollectsPage, AccountMessagesPage, AccountTopicsPage } from '../pages/account/';
import { UserPage } from '../pages/user/';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Badge } from '@ionic-native/badge';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppVersion } from '@ionic-native/app-version';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { TopicService, MessageService, RepliesService, UserService, CollectService, CoreService, UtilService } from '../service/';

import { TabDirective } from "../directive/";
import { AmAgoTimePipe, LinkPipe } from '../pipe/'

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HomeAddPage,
    HomeDetailPage,
    LoginPage,
    AccountPage,
    UserPage,
    AccountCollectsPage,
    AccountMessagesPage,
    AccountTopicsPage,
    TabDirective,
    AmAgoTimePipe,
    LinkPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      pageTransition: 'ios-transition'
    }, {
        links: [
          { component: HomePage, name: 'Home', segment: 'home' },
          { component: HomePage, name: 'Home', segment: 'home/tab/:tab' },
          { component: HomeDetailPage, name: 'HomeDetail', segment: 'home/:id' },
          { component: HomeAddPage, name: 'HomeAdd', segment: 'home/add' },
          { component: UserPage, name: 'User', segment: 'user/:loginname' },
          { component: LoginPage, name: 'Login', segment: 'login' },
          { component: AccountPage, name: 'Account', segment: 'account' },
          { component: AccountCollectsPage, name: 'AccountCollects', segment: 'account/collects' },
          { component: AccountMessagesPage, name: 'AccountMessages', segment: 'account/messages' },
          { component: AccountTopicsPage, name: 'AccountTopics', segment: 'account/topics' }
        ]
      }),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    HomeAddPage,
    HomeDetailPage,
    LoginPage,
    AccountPage,
    AccountCollectsPage,
    AccountMessagesPage,
    AccountTopicsPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Badge,
    InAppBrowser,
    SocialSharing,
    AppVersion,
    BarcodeScanner,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TopicService,
    MessageService,
    RepliesService,
    TopicService,
    UserService,
    CollectService,
    CoreService,
    UtilService
  ]
})
export class AppModule { }
