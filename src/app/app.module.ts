import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { HomePage, HomeAddPage, HomeDetailPage } from '../pages/home/';
import { LoginPage } from '../pages/login/';
import { AccountPage, AccountCollectsPage, AccountMessagesPage, AccountTopicsPage } from '../pages/account/';
import { UserPage } from '../pages/user/';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TopicService, MessageService, RepliesService, UserService, CollectService, CoreService, UtilService} from '../service/';

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
          { component: UserPage, name: 'User', segment: 'user/:loginname' },
          { component: LoginPage, name: 'Login', segment: 'login' },
          { component: AccountPage, name: 'Account', segment: 'account' }
        ]
      }),
    HttpModule,
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
